const pokemonlist = document.querySelector("#pokemonlist");
const pokemonCard = document.querySelector(".pokemonCard");
const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/";

window.addEventListener("load", (e) => {
  getPokemonList().then(() => getPokemon(defaultPokemon));
  registerServiceWorker();
});

pokemonlist.addEventListener("change", (e) => {
  getPokemon(e.target.value);
});

async function getPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=30";

  const response = await fetch(url);
  const pokemons = await response.json();

  pokemonlist.innerHTML = pokemons.results.map(
    (result) => `<option value=${result.url}>${result.name}</option>`
  );
}

async function getPokemon(apiurl) {
  try {
    const response = await fetch(apiurl);
    const pokemon = await response.json();
    pokemonCard.innerHTML = createPokemonCard(pokemon);
  } catch (error) {
    console.log("Error fetching data:", error);
    pokemonCard.innerHTML = offlineCard();
  }
}

function createPokemonCard(pokemon) {
  let pokTypes = "";
  pokemon.types.forEach((type) => {
    pokTypes += type.type.name + " ";
  });
  return `
  <div class="col-md-3 mx-auto m-3 ">
      <div class="card mx-auto" >
      <div class="card-header text-capitalize pt-1 pb-1 text-center"><h4>${pokemon.name}</h4></div>
        <img src="${pokemon.sprites.other.dream_world.front_default}" class="text-center mx-auto d-block mt-3 mb-1" alt="${pokemon.name}" width="250px" height="250px">
        <div class="card-body text-center text-capitalize p-4">
          <h3><span class="badge bg-warning text-dark ">Height:${pokemon.height} </span></h3>
          <h3><span class="badge bg-info text-dark ">Weight: ${pokemon.weight}</span></h3>
          <hr class="divider">
          <p class="card-text">
            <div class="descripcion ", sytle="font-size:16px;">
              <p><b>Pokemon Type</b></p>
              <h3 class="text-danger">${pokTypes}</h3>

            </div>
          </p>

        </div>
      </div>
    </div>
  `;
}

function offlineCard() {
  return `
  <div class="col-md-3 mx-auto m-3 ">
      <div class="card mx-auto" >
      <div class="card-header text-capitalize pt-1 pb-1 text-center"></div>
       
        <div class="card-body text-center text-capitalize p-4">

          <p class="card-text">
            <div class="descripcion ", sytle="font-size:16px;">
              <p>Network Unavailable</p>

            </div>
          </p>         
        </div>
      </div>
    </div>
  `;
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch (error) {
      console.log("Failed to register: ", error);
    }
  }
}
