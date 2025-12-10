
document.getElementById("loadFixtures").addEventListener("click", loadFixtures);

async function loadFixtures() {
    try {
        const response = await fetch("http://localhost:5000/fixtures");
        const data = await response.json();

        const matches = data.matches;
        const container = document.getElementById("fixtures-container");

        container.innerHTML = "";

        matches.forEach(match => {
            const card = document.createElement("div");
            card.classList.add("match-card");

            const date = new Date(match.utcDate);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            // SCORE HANDLING
            const homeScore = match.score.fullTime.home ?? "-";
            const awayScore = match.score.fullTime.away ?? "-";

            card.innerHTML = `
                <div class="team">
                    <img src="${match.homeTeam.crest}" />
                    <span>${match.homeTeam.name}</span>
                </div>

                <div class="score">${homeScore} - ${awayScore}</div>

                <div class="team">
                    <img src="${match.awayTeam.crest}" />
                    <span>${match.awayTeam.name}</span>
                </div>

                <div class="match-info">
                    <div>${formattedDate}</div>
                    <div>${formattedTime}</div>
                    <div class="status ${match.status}">${match.status}</div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load fixtures!");
    }
}
