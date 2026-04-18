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

// Team Detail Badges
const teamCity = document.getElementById('team-city');
const teamConf = document.getElementById('team-conf');
const teamDiv = document.getElementById('team-div');

// Your official Balldontlie API Key
const API_KEY = '7f9384c4-597d-4012-9a18-dc5486a2b1cd'; 

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
        // Generate a random ID and fetch the player's data
        const randomPlayerId = Math.floor(Math.random() * 400) + 1;
        const response = await fetch(`https://api.balldontlie.io/v1/players/${randomPlayerId}`, {
            method: 'GET',
            headers: { 'Authorization': API_KEY }
        });

        if (!response.ok) throw new Error("Player not found");
        
        const json = await response.json();
        const player = json.data;
        
        // Update the Basic Info
        playerName.innerText = `${player.first_name} ${player.last_name}`;
        playerTeam.innerText = player.team ? `${player.team.full_name} (${player.team.abbreviation})` : 'No Team Data';
        playerPosition.innerText = player.position ? `Position: ${player.position}` : 'Position: Unknown';

        // Update Bio Badges
        playerJersey.innerText = player.jersey_number ? `#${player.jersey_number}` : 'N/A';
        playerHeight.innerText = player.height ? player.height : 'N/A';
        playerWeight.innerText = player.weight ? `${player.weight} lbs` : 'N/A';

        // NEW: Update Team Badges (This data comes free with the first API call!)
        if (player.team) {
            teamCity.innerText = player.team.city || 'N/A';
            teamConf.innerText = player.team.conference || 'N/A';
            teamDiv.innerText = player.team.division || 'N/A';
        } else {
            teamCity.innerText = 'N/A';
            teamConf.innerText = 'N/A';
            teamDiv.innerText = 'N/A';
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        playerName.innerText = "Error loading player.";
        playerTeam.innerText = "Click to try again.";
        playerPosition.innerText = "";
        
        // Reset all badges on error
        const emptyState = "--";
        playerJersey.innerText = emptyState;
        playerHeight.innerText = emptyState;
        playerWeight.innerText = emptyState;
        teamCity.innerText = emptyState;
        teamConf.innerText = emptyState;
        teamDiv.innerText = emptyState;
    } finally {
        showCard();
    }
}

// Event Listener for the button
generateBtn.addEventListener('click', fetchNBAPlayer);

// Load one player immediately when the page first opens
fetchNBAPlayer();
