const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

console.log(">>> SERVER.JS STARTED FROM THIS FILE <<<");

const app = express();
app.use(cors());

// ✅ Serve frontend files from ROOT
app.use(express.static(__dirname));

// ✅ Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ---------------- API KEY ----------------
const API_KEY = "a31ab29888a84515af8deeddb025b8ae";

// ---------- ROUTES ----------

// ALL football FIXTURES
app.get("/fixtures", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
});

// PL standings
app.get("/standings", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/standings",
      { headers: { "X-Auth-Token": API_KEY } }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Multiple league standings
app.get("/standings/:league", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${req.params.league}/standings`,
      { headers: { "X-Auth-Token": API_KEY } }
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

// PL matches
app.get("/pl-matches", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/matches",
      { headers: { "X-Auth-Token": API_KEY } }
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch PL matches" });
  }
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
// -------- NEWS API (Backend Proxy) --------
const NEWS_API_KEY = "b5207fb060a54fe0ad5200ae697e4b44";

app.get("/news/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

