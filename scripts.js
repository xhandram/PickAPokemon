const pokemonlist = document.querySelector("#pokemonlist");
const pokemonCard = document.querySelector(".pokemonCard");
const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/";

window.addEventListener("load", (e) => {
  getPokemonList().then(() => getPokemon(defaultPokemon));
});

pokemonlist.addEventListener("change", (e) => {
  console.log(e.target.value);
  getPokemon(getPokemon(e.target.value));
});

async function getPokemonList() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=5";

  const response = await fetch(url);
  const pokemons = await response.json();

  pokemonlist.innerHTML = pokemons.results.map(
    (result) => `<option value=${result.url}>${result.name}</option>`
  );
}

async function getPokemon(apiurl) {
  const response = await fetch(apiurl);
  const pokemon = await response.json();

  const types = getPokemonTypes(pokemon.types);
  pokemonCard.innerHTML = createPokemonCard(pokemon);
}

function createPokemonCard(pokemon) {
  return `
  <div class="col-md-4 mx-auto m-5 ">
      <div class="card mx-auto p-4" >
        <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="..." width="">
        <div class="card-body">
          <span class="badge bg-warning text-dark float-right">Height:${pokemon.height} </span>
          <span class="badge bg-info text-dark float-right">Weight: ${pokemon.weight}</span>
          <h5 class="card-title mt-3 text-capitalize">${pokemon.name}</h5>
          <p class="card-text">
            <div class="descripcion">
              <h4>Pokemon Type</h4>

            </div>
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  `;
}
