// Grab DOM elements
const generateBtn = document.getElementById('generate-btn');
const profileCard = document.getElementById('profile-card');
const playerName = document.getElementById('player-name');
const playerTeam = document.getElementById('player-team');
const playerPosition = document.getElementById('player-position');
const playerJersey = document.getElementById('player-jersey');
const playerHeight = document.getElementById('player-height');
const playerWeight = document.getElementById('player-weight');

// Balldontlie API Key
const API_KEY = '7f9384c4-597d-4012-9a18-dc5486a2b1cd'; 

async function fetchNBAPlayer() {
    try {
        // Generate a random ID between 1 and 400 to pull a random player
        const randomPlayerId = Math.floor(Math.random() * 400) + 1;
        
     
        const response = await fetch(`https://api.balldontlie.io/v1/players/${randomPlayerId}`, {
            method: 'GET',
            headers: {
                'Authorization': API_KEY
            }
        });

        if (!response.ok) throw new Error("Player not found");
        
        const json = await response.json();
        const player = json.data;
        
        // Update the HTML elements with the NBA data
        playerName.innerText = `${player.first_name} ${player.last_name}`;
        playerTeam.innerText = `${player.team.full_name} (${player.team.abbreviation})`;
        playerPosition.innerText = player.position ? `Position: ${player.position}` : 'Position: Unknown';
        // Update the basic info
        playerName.innerText = `${player.first_name} ${player.last_name}`;
        playerTeam.innerText = `${player.team.full_name} (${player.team.abbreviation})`;
        playerPosition.innerText = player.position ? `Position: ${player.position}` : 'Position: Unknown';

        
        playerJersey.innerText = player.jersey_number ? `#${player.jersey_number}` : 'N/A';
        playerHeight.innerText = player.height ? player.height : 'N/A';
        playerWeight.innerText = player.weight ? `${player.weight} lbs` : 'N/A';

        //Anime.js Animation!
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
    }
}

// Event Listener for the button
generateBtn.addEventListener('click', fetchNBAPlayer);

// Load one player immediately when the page first opens
fetchNBAPlayer();
