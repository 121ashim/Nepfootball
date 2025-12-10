async function loadStandings(leagueCode) {
    try {
        const response = await fetch(`http://localhost:5000/standings/${leagueCode}`);
        const data = await response.json();

        const tableBody = document.querySelector("#standings-table tbody");
        tableBody.innerHTML = "";

        const standings = data.standings[0].table;

        standings.forEach(team => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${team.position}</td>
                <td>
                    <img src="${team.team.crest}" width="25" height="25">
                    ${team.team.name}
                </td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.goalsFor}</td>
                <td>${team.goalsAgainst}</td>
                <td>${team.goalDifference}</td>
                <td>${team.points}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load standings!");
    }
}
