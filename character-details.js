
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");


fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
  .then((response) => response.json())
  .then((character) => {
    const characterDetailsContainer = document.querySelector(
      "#character-details-container"
    );

    
    const characterDetailsHTML = `
            <div class="character-top-content">
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2><br>
            </div>
            <div class="character-desc">
                <h1> Character info </h1>
                <div class="character-info">
                    <span>Species:<h4> ${character.species}</h4></span>
                    <span>Origin:<h4> ${character.origin.name}</h4></span>
                    <span>Location:<h4> ${character.location.name}</h4></span>
                    <span>Status:<h4> ${character.status}</h4> </span>
                    <span>Gender: <h4> ${character.gender}</h4> </span>
                    </div>
                   <div class="character-episodes">
                   <h1>Episodes</h1>
                   ${character.episode
                     .map(
                       (episodeUrl) =>
                         `<a href="${episodeUrl}">${episodeUrl}</a>`
                     )
                     .join("<br>")}
                   </div>
                    
                
            </div>
        `;

    
    characterDetailsContainer.innerHTML = characterDetailsHTML;
  })
  .catch((error) => {
    console.error("Error fetching character details:", error);
  });
