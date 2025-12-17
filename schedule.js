document.getElementById("loadPLSchedule").addEventListener("click", loadPLSchedule);

async function loadPLSchedule() {
    try {
        const response = await fetch("/pl-matches");

        const data = await response.json();

        const matches = data.matches;
        const container = document.getElementById("pl-container");

        container.innerHTML = "";

        // Sort matches by date
        matches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

        matches.forEach(match => {
            const card = document.createElement("div");
            card.classList.add("match-card");

            const dateObj = new Date(match.utcDate);
            const formattedDate = dateObj.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            });

            const formattedTime = dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            const statusMap = {
                "SCHEDULED": "Upcoming",
                "IN_PLAY": "Live",
                "PAUSED": "Half-time",
                "FINISHED": "Finished"
            };

            const statusText = statusMap[match.status] || match.status;

            // If match finished, show score
            let scoreHTML = "";
            if (match.status === "FINISHED") {
                scoreHTML = `
                    <div class="score">
                        ${match.score.fullTime.home} - ${match.score.fullTime.away}
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="team">
                    <img src="${match.homeTeam.crest || ""}" alt="">
                    <span>${match.homeTeam.name}</span>
                </div>

                <div class="vs">vs</div>

                <div class="team">
                    <img src="${match.awayTeam.crest || ""}" alt="">
                    <span>${match.awayTeam.name}</span>
                </div>

                <div class="match-info">
                    <div>${formattedDate}</div>
                    <div>${formattedTime}</div>
                    <div class="status">${statusText}</div>
                    ${scoreHTML}
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load Premier League schedule");
    }
}

