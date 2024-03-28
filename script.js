let nextPage = 1; 

function fetchCharacters () {

fetch("https://rickandmortyapi.com/api/character/")
    .then(response => response.json())
    .then(data => {
        makeCards(data.results);
        nextPage = data.info.next ? nextPage + 1 : null;
    })
    .catch(error => console.error('Error fetching characters:', error));
}
function makeCards(charactersArray) {
    const cardContainer = document.querySelector("#card-container");
    charactersArray.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character-container');
        card.setAttribute('id', character.id);

        card.innerHTML = `
            <div class="character-img">
                <img src="${character.image}" alt="${character.name}"></img>
            </div>
            <div class="character-desc">
                <h2>${character.name}</h2><br>
                <div class="character-info">
                    <span>Species: <h4> ${character.species}</h4> </span>
                    <span>Origin: <h4> ${character.origin.name}</h4></span>
                    <span>Location:<h4> ${character.location.name}</h4></span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            // Redirect to another page with more information about the character
            window.location.href = `character-details.html?id=${character.id}`;
        });

        cardContainer.appendChild(card);
    });
}

function loadMoreCharacters() {
    if (nextPage) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

        if (windowHeight + scrollPosition >= documentHeight){
            fetchCharacters();
        }
    }
}

window.addEventListener('scroll' , loadMoreCharacters);
fetchCharacters();


// Function to search characters by name
function searchCharacters(searchQuery) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            const characterResults = data.results;
            if (characterResults.length > 0) {
                // Clear previous search results
                const cardContainer = document.querySelector("#card-container");
                cardContainer.innerHTML = '';
                // Display search results
                makeCards(characterResults);
            } else {
                // No matching characters found
                alert("No characters found with that name.");
            }
        })
        .catch(error => console.error("Error searching characters:", error));
}

document.getElementById('character-search').addEventListener('input', searchCharacters);

function searchCharacters() {
    const searchQuery = document.getElementById('character-search').value.toLowerCase();
    const characterContainers = document.querySelectorAll('.character-container');

    characterContainers.forEach(container => {
        const characterName = container.querySelector('h2').innerText.toLowerCase();
        if (characterName.includes(searchQuery)) {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    });
}