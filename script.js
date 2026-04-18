// Grab DOM elements
const generateBtn = document.getElementById('generate-btn');
const profileCard = document.getElementById('profile-card');
const playerName = document.getElementById('player-name');
const playerTeam = document.getElementById('player-team');
const playerPosition = document.getElementById('player-position');

// Bio Badges
const playerJersey = document.getElementById('player-jersey');
const playerHeight = document.getElementById('player-height');
const playerWeight = document.getElementById('player-weight');

// Stat Badges
const playerPts = document.getElementById('player-pts');
const playerReb = document.getElementById('player-reb');
const playerAst = document.getElementById('player-ast');

// Your official Balldontlie API Key
const API_KEY = '7f9384c4-597d-4012-9a18-dc5486a2b1cd'; 

async function fetchNBAPlayer() {
    try {
        // 1. Generate a random ID and fetch the player's bio data
        const randomPlayerId = Math.floor(Math.random() * 400) + 1;
        const bioResponse = await fetch(`https://api.balldontlie.io/v1/players/${randomPlayerId}`, {
            method: 'GET',
            headers: { 'Authorization': API_KEY }
        });

        if (!bioResponse.ok) throw new Error("Player not found");
        
        const bioJson = await bioResponse.json();
        const player = bioJson.data;
        
        // 2. Fetch the player's performance stats using their new ID (Checking the 2023 season)
        const statsResponse = await fetch(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${player.id}`, {
            method: 'GET',
            headers: { 'Authorization': API_KEY }
        });
        
        const statsJson = await statsResponse.json();
        const stats = statsJson.data[0]; // Gets the first result

        // 3. Update the Basic Info
        playerName.innerText = `${player.first_name} ${player.last_name}`;
        playerTeam.innerText = `${player.team.full_name} (${player.team.abbreviation})`;
        playerPosition.innerText = player.position ? `Position: ${player.position}` : 'Position: Unknown';

        // 4. Update Bio Badges
        playerJersey.innerText = player.jersey_number ? `#${player.jersey_number}` : 'N/A';
        playerHeight.innerText = player.height ? player.height : 'N/A';
        playerWeight.innerText = player.weight ? `${player.weight} lbs` : 'N/A';

        // 5. Update Game Stat Badges
        if (stats) {
            playerPts.innerText = stats.pts.toFixed(1);
            playerReb.innerText = stats.reb.toFixed(1);
            playerAst.innerText = stats.ast.toFixed(1);
        } else {
            playerPts.innerText = "N/A";
            playerReb.innerText = "N/A";
            playerAst.innerText = "N/A";
        }

        // 6. Play the Anime.js Animation!
        anime({
            targets: '.profile-card',
            translateY: [50, 0], 
            opacity: [0, 1],     
            duration: 800,       
            easing: 'easeOutElastic(1, .6)' 
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        playerName.innerText = "Error loading player.";
        playerTeam.innerText = "Click to try again.";
        playerPosition.innerText = "";
        
        // Reset all badges on error
        const emptyState = "--";
        playerPts.innerText = emptyState;
        playerReb.innerText = emptyState;
        playerAst.innerText = emptyState;
        playerJersey.innerText = emptyState;
        playerHeight.innerText = emptyState;
        playerWeight.innerText = emptyState;
    }
}

// Event Listener for the button
generateBtn.addEventListener('click', fetchNBAPlayer);

// Load one player immediately when the page first opens
fetchNBAPlayer();
