document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('f1-results-content');
    const gpNameElement = document.getElementById('gp-name');
    
    // URL de base de l'API OpenF1 (Jolpica) - PAS DE PROXY NÉCESSAIRE EN LIGNE
    const BASE_API_URL = 'https://api.openf1.org/v1/';
    
    // Endpoint pour obtenir les résultats complets du dernier GP
    const LAST_RACE_ENDPOINT = 'race_results?meeting_key=latest&limit=100'; 
    
    // Fonction utilitaire pour le nom du pilote
    function getDriverName(driver) {
        return driver.driver_code || driver.full_name;
    }

    // Mappage des noms d'équipe à une couleur (Pour un futur style de tableau)
    const teamColors = {
        'Red Bull Racing': '#0600EF', // Blue
        'Ferrari': '#DC0000',         // Red
        'Mercedes': '#00D2BE',        // Teal
        'McLaren': '#FF8700',         // Orange
        // ... ajoutez d'autres équipes ...
    };

    // =========================================================================
    // VERSION FINALE AVEC APPEL API EN DIRECT
    // =========================================================================
    async function fetchJolpicaData(endpoint) {
        console.log("Attempting to fetch live F1 data...");
        const fullApiUrl = BASE_API_URL + endpoint;

        try {
            const response = await fetch(fullApiUrl);
            if (!response.ok) {
                // Si l'API renvoie une erreur (404, 500, etc.)
                throw new Error(`API returned status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API Fetch Error:", error);
            // Retourne null en cas d'échec de connexion
            return null; 
        }
    }
    // =========================================================================
    // FIN DU CODE FINAL D'APPEL API
    // =========================================================================


    // Fonction principale pour récupérer et afficher les données
    async function loadLastGPResults() {
        container.innerHTML = '<p style="color: var(--color-secondary);">Connecting to F1 API...</p>';
        
        const resultsData = await fetchJolpicaData(LAST_RACE_ENDPOINT);

        if (!resultsData || resultsData.length === 0) {
            // Message d'erreur EN ANGLAIS 
            gpNameElement.textContent = `F1 Connection Error`;
            container.innerHTML = '<p style="color: var(--color-primary);">Connection Failed. The OpenF1 API is currently unavailable or returned no data. Please try again later.</p>';
            return;
        }

        const raceDetails = resultsData[0];
        const raceName = raceDetails.race_name;
        const raceYear = raceDetails.season;

        // 1. Mise à jour du titre
        gpNameElement.textContent = `Latest Grand Prix Results: ${raceName} (${raceYear})`;

        // 2. Extraction du Top 10 (ou tous les résultats)
        const topResults = resultsData.filter(r => r.position > 0).sort((a, b) => a.position - b.position);

        // 3. Affichage du tableau des résultats
        let resultsTableHTML = '<h3 style="color: var(--f1-red); font-family: Oswald; margin-bottom: 20px;">Race Results (Top 10)</h3>';
        
        resultsTableHTML += `
            <table class="f1-results-table">
                <thead>
                    <tr>
                        <th>POS</th>
                        <th>DRIVER</th>
                        <th>TEAM</th>
                        <th>TIME / GAP</th>
                        <th class="fastest-lap-header">FASTEST LAP</th>
                    </tr>
                </thead>
                <tbody>
        `;

        topResults.forEach(result => {
            const timeOrGap = result.position === 1 ? 'Winner' : result.time_delta_to_lap_leader ? '+' + result.time_delta_to_lap_leader + 's' : result.status;
            const fastestLapIndicator = result.fastest_lap_rank === 1 ? 'fastest-lap-indicator' : '';
            const teamColor = teamColors[result.constructor_name] || '#FFFFFF'; // Couleur par défaut blanche
            
            resultsTableHTML += `
                <tr class="driver-row pos-${result.position}" style="border-left: 5px solid ${teamColor};">
                    <td class="pos-cell">${result.position}</td>
                    <td class="driver-cell">
                        <span class="driver-code" style="color:${teamColor};">${result.driver_code}</span>
                        <span class="full-name">${result.full_name}</span>
                    </td>
                    <td class="team-cell">${result.constructor_name}</td>
                    <td>${timeOrGap}</td>
                    <td class="fastest-lap-cell ${fastestLapIndicator}">${result.fastest_lap_time || 'N/A'}</td>
                </tr>
            `;
        });

        resultsTableHTML += '</tbody></table>';

        // 4. Assemblage final
        container.innerHTML = `
            ${resultsTableHTML}
        `;
        
        // Retirons le message de la API Info, car le tableau est plus lisible
        const apiInfo = document.querySelector('.api-info');
        if (apiInfo) {
            apiInfo.style.marginTop = '60px'; // Garde un espacement
            container.appendChild(apiInfo); // Bouge la section en bas du tableau
        }
    }

    loadLastGPResults();
});