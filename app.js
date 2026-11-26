

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const container = document.getElementById('characters-container');
const total = document.getElementById('total-personajes');

// Obtener los primeros 20 Pokémon
async function getCharacters() {
    try {
        container.innerHTML = '<p>Cargando Pokémon...</p>';
        total.textContent = '';

        const response = await fetch(`${API_URL}?limit=20`);

        if (!response.ok) {
            throw new Error('Ocurrió un error al conectar con la API');
        }

        const data = await response.json();

        // Obtener información de cada Pokémon
        const characters = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);

                if (!res.ok) {
                    throw new Error('Error al cargar un Pokémon');
                }

                return await res.json();
            })
        );

        renderCharacters(characters);

        total.textContent =
            `Total de Pokémon: ${characters.length}`;

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML =
            '<p>No se pudieron cargar los Pokémon.</p>';
    }
}

// Obtener imagen del Pokémon
function getImage(pokemon) {
    return pokemon.sprites.other['official-artwork'].front_default
        || pokemon.sprites.front_default
        || '';
}

// Mostrar tarjetas
function renderCharacters(characters) {
    container.innerHTML = '';

    characters.forEach(character => {

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${getImage(character)}" alt="${character.name}">

            <h3>${character.name}</h3>

            <p>ID: #${character.id}</p>

            <p>Tipo: ${character.types.map(t => t.type.name).join(', ')}</p>
        `;

        container.appendChild(card);
    });
}

// Buscar Pokémon por ID o nombre
async function searchCharacter() {
    const id = document.getElementById('search-input')
        .value.trim().toLowerCase();

    if (id === '') {
        getCharacters();
        return;
    }

    try {
        container.innerHTML = '<p>Buscando Pokémon...</p>';
        total.textContent = '';

        const response = await fetch(
            `${API_URL}/${encodeURIComponent(id)}`
        );

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const character = await response.json();

        container.innerHTML = `
            <div class="card detail-card">

                <img src="${getImage(character)}" alt="${character.name}">

                <h3>#${character.id} - ${character.name}</h3>

                <span class="status">
                    ${character.types.map(t => t.type.name).join(', ')}
                </span>

                <hr>

                <p><strong>NOMBRE:</strong> ${character.name}</p>

                <p><strong>TIPO:</strong> ${character.types.map(t => t.type.name).join(', ')}</p>

                <p><strong>ALTURA:</strong> ${character.height / 10} m</p>

                <p><strong>PESO:</strong> ${character.weight / 10} kg</p>

                <p><strong>HABILIDADES:</strong> ${character.abilities.map(a => a.ability.name).join(', ')}</p>

                <p><strong>EXPERIENCIA:</strong> ${character.base_experience ?? 'No disponible'}</p>

            </div>
        `;

        total.textContent = 'Resultado de búsqueda: 1 Pokémon';

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML =
            '<p>No se encontró el Pokémon.</p>';
    }
}

// Buscar presionando Enter
document.getElementById('search-input')
    .addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchCharacter();
        }
    });

// Cargar los 20 Pokémon al iniciar
getCharacters();

