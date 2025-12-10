const express = require("express");
const fetch = require("node-fetch");
console.log(">>> SERVER.JS STARTED FROM THIS FILE <<<");

const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "a31ab29888a84515af8deeddb025b8ae";

//  ALL football FIXTURES 
app.get("/fixtures", async (req, res) => {
    try {
        const response = await fetch("https://api.football-data.org/v4/matches", {
            headers: { "X-Auth-Token": API_KEY }
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch fixtures" });
    }
});

// pl standings
app.get("/standings", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.football-data.org/v4/competitions/PL/standings",
            {
                headers: { "X-Auth-Token": API_KEY }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.log("API Response:", errorData);
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Standings Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// multiple league standings

app.get("/standings/:league", async (req, res) => {
    const league = req.params.league; // PL, PD, SA

    try {
        const response = await fetch(
            `https://api.football-data.org/v4/competitions/${league}/standings`,
            { headers: { "X-Auth-Token": API_KEY } }
        );

        if (!response.ok) {
            const data = await response.json();
            return res.status(response.status).json(data);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error("Standings Error:", error);
        res.status(500).json({ error: "Failed to fetch standings" });
    }
});

// pl schedule
app.get("/pl-matches", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.football-data.org/v4/competitions/PL/matches",
            { headers: { "X-Auth-Token": API_KEY } }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("PL Matches Error:", error);
        res.status(500).json({ error: "Failed to fetch PL matches" });
    }
});


// ---------- SERVER ----------
app.listen(5000, () => {
    console.log("Backend running at http://localhost:5000");
});
 