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

// NEW: We separated the animation so it ALWAYS runs
function showCard() {
    anime({
        targets: '.profile-card',
        translateY: [50, 0], 
        opacity: [0, 1],     
        duration: 800,       
        easing: 'easeOutElastic(1, .6)' 
    });
}

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
        
        // 2. Fetch the player's performance stats safely
        const statsResponse = await fetch(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${player.id}`, {
            method: 'GET',
            headers: { 'Authorization': API_KEY }
        });
        
        let stats = null;
        if (statsResponse.ok) {
            const statsJson = await statsResponse.json();
            stats = statsJson.data[0]; 
        }

        // 3. Update the Basic Info (SAFELY checking if they have a team)
        playerName.innerText = `${player.first_name} ${player.last_name}`;
        playerTeam.innerText = player.team ? `${player.team.full_name} (${player.team.abbreviation})` : 'No Team Data';
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
    } finally {
        // 6. Play the Anime.js Animation! 
        // Putting this in 'finally' guarantees the card appears, even if the data fetch fails.
        showCard();
    }
}

// Event Listener for the button
generateBtn.addEventListener('click', fetchNBAPlayer);

// Load one player immediately when the page first opens
fetchNBAPlayer();
