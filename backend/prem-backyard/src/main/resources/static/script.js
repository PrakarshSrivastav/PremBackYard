let teams = [];
let nations = [];

async function initializeFilters() {
    try {
        const response = await fetch('http://localhost:8080/Premplayer');
        const players = await response.json();

        // Populate Team dropdown
        teams = [...new Set(players.map(p => p.team))].sort();
        const teamSelect = document.getElementById('filterTeam');
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamSelect.appendChild(option);
        });

        // Populate Nation dropdown
        nations = [...new Set(players.map(p => p.nation))].sort();
        const nationSelect = document.getElementById('filterNation');
        nations.forEach(nation => {
            const option = document.createElement('option');
            option.value = nation;
            option.textContent = nation;
            nationSelect.appendChild(option);
        });

        // Populate Team and Nation dropdowns in the modal
        populateModalDropdowns();
    } catch (error) {
        console.error('Error initializing filters:', error);
    }
}

function populateModalDropdowns() {
    const addTeamSelect = document.getElementById('addTeam');
    const addNationSelect = document.getElementById('addNation');

    // Clear existing options
    addTeamSelect.innerHTML = '<option value="">Select Team</option>';
    addNationSelect.innerHTML = '<option value="">Select Nationality</option>';

    // Populate Team dropdown
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        addTeamSelect.appendChild(option);
    });

    // Populate Nation dropdown
    nations.forEach(nation => {
        const option = document.createElement('option');
        option.value = nation;
        option.textContent = nation;
        addNationSelect.appendChild(option);
    });
}

async function fetchPlayers() {
    const filters = {
        team: document.getElementById('filterTeam').value,
        position: document.getElementById('filterPosition').value,
        nation: document.getElementById('filterNation').value
    };

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (value) params.append(key, value);
    }

    try {
        const response = await fetch(`http://localhost:8080/Premplayer/filtered?${params}`);
        const players = await response.json();
        renderPlayers(players);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

function renderPlayers(players) {
    const container = document.getElementById('playerList');
    container.innerHTML = players.map(player => `
        <div class="player-card">
            <h3>${player.name}</h3>
            <div class="player-info">
                <p>${player.team} • ${player.pos} • Age ${player.age}</p>
                <p>Nationality: ${player.nation}</p>
            </div>
            <div class="player-stats">
                <div class="stat-item">
                    <span class="stat-label">Matches Played</span>
                    <span class="stat-value">${player.mp}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Goals</span>
                    <span class="stat-value">${player.gls}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Assists</span>
                    <span class="stat-value">${player.ast}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">xG</span>
                    <span class="stat-value">${player.xg?.toFixed(1) || '0.0'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">xA</span>
                    <span class="stat-value">${player.xag?.toFixed(1) || '0.0'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Cards</span>
                    <span class="stat-value">${(player.crdy || 0) + (player.crdr || 0)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Show the modal
function showAddForm() {
    document.getElementById('addModal').style.display = 'block';
}

// Hide the modal
function closeModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('playerForm').reset(); // Reset the form
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    const newPlayer = {
        name: document.getElementById('addName').value,
        team: document.getElementById('addTeam').value,
        position: document.getElementById('addPosition').value,
        nation: document.getElementById('addNation').value,
        age: parseInt(document.getElementById('addAge').value),
        mp: parseInt(document.getElementById('addMP').value),
        gls: parseInt(document.getElementById('addGls').value),
        ast: parseInt(document.getElementById('addAst').value),
        xg: parseFloat(document.getElementById('addXg').value),
        xag: parseFloat(document.getElementById('addXag').value),
        crdy: 0,
        crdr: 0
    };

    try {
        const response = await fetch('http://localhost:8080/Premplayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer)
        });

        if (!response.ok) throw new Error('Failed to add player');

        closeModal();
        fetchPlayers(); // Refresh the player list
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding player: ' + error.message);
    }
}

// Event Listeners
document.getElementById('filterTeam').addEventListener('change', fetchPlayers);
document.getElementById('filterPosition').addEventListener('change', fetchPlayers);
document.getElementById('filterNation').addEventListener('change', fetchPlayers);

window.onclick = function(event) {
    const modal = document.getElementById('addModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialization
initializeFilters().then(fetchPlayers);