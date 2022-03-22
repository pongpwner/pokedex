export async function getPokemonList() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3").then(
    (response) => response.json()
  );

  return data.results;
}
export async function getPokemonListWithTypes(pokemonList) {
  const list = await Promise.all(
    pokemonList.map((url, pokemonId) => {
      let pokemonData = fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      return pokemonData;
    })
  );
  let finalList = list.map((pokemonData) => {
    let typesArray = pokemonData.types.map((thing) => thing.type.name);
    return {
      sprites: [
        pokemonData.sprites.front_default,
        pokemonData.sprites.back_default,
        pokemonData.sprites.front_shiny,
        pokemonData.sprites.back_shiny,
      ],
      name: pokemonData.name,
      types: typesArray,
      id: pokemonData.id,
    };
  });
  console.log(finalList);
  return finalList;
}

// export async function getCurrentPokemon(id) {
//   const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
//     (response) => response.json()
//   );
//   console.log(data);
//   return data;
// }
export async function getCurrentPokemon(id) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (response) => response.json()
  );
  const data1 = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((response) => response.json());

  let typesArray = data.types.map((thing) => thing.type.name);
  let abilitiesArray = data.abilities.map((ability) => ability.ability.name);
  let statsArray = data.stats.map((stat) => ({
    baseStat: stat.base_stat,
    name: stat.stat.name,
  }));
  let pokdexDesciption = data1.flavor_text_entries[0].flavor_text;

  return {
    sprites: [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ],
    types: typesArray,
    height: data.height,
    weight: data.weight,
    name: data.name,
    abilities: abilitiesArray,
    stats: statsArray,
    description: pokdexDesciption,
    id: id,
  };
}

export async function getPokemonDescription(id) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((response) => response.json());

  console.log(data);
  return data.flavor_text_entries[0].flavor_text;
}
