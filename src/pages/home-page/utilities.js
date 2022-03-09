export async function getPokemonList() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then(
    (response) => response.json()
  );

  return data.results;
}

export async function getCurrentPokemon(id) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (response) => response.json()
  );
  console.log(data);
  return data;
}
