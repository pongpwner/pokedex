export async function getPokemonDescription(id) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((response) => response.json());

  //console.log(data);
  return data.flavor_text_entries[0].flavor_text;
}

export async function getPokemonList() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=390").then(
    (response) => response.json()
  );

  return data.results;
}
export async function getPokemonListWithInfo(pokemonList) {
  const listPokemon = await Promise.all(
    pokemonList.map((url, pokemonId) => {
      let pokemonData = fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));
      //let pokedexDescription = getPokemonDescription(pokemonId + 1);

      return pokemonData;
    })
  );
  const listDescription = await Promise.all(
    pokemonList.map((url, id) => {
      let pokemonData = fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id + 1}`
      ).then((response) => response.json());
      return pokemonData;
    })
  );
  console.log(listPokemon);
  console.log(listDescription);
  let lastList = [];
  // let finalList = listPokemon.map((pokemonData) => {
  //   console.log(listPokemon);
  //   let typesArray = pokemonData.types.map((thing) => thing.type.name);
  //   let statsArray = pokemonData.stats.map((stat) => ({
  //     baseStat: stat.base_stat,
  //     name: stat.stat.name,
  //   }));
  //   let abilitiesArray = pokemonData.abilities.map(
  //     (ability) => ability.ability.name
  //   );
  //   return {
  //     sprites: [
  //       pokemonData.sprites.front_default,
  //       pokemonData.sprites.back_default,
  //       pokemonData.sprites.front_shiny,
  //       pokemonData.sprites.back_shiny,
  //     ],
  //     name: pokemonData.name,
  //     types: typesArray,
  //     id: pokemonData.id,
  //     height: pokemonData.height,
  //     weight: pokemonData.weight,
  //     abilities: abilitiesArray,
  //     stats: statsArray,
  //     //description: pokedexDescription,
  //   };
  // });

  for (let i = 0; i < listPokemon.length; i++) {
    let typesArray = listPokemon[i].types.map((thing) => thing.type.name);
    let statsArray = listPokemon[i].stats.map((stat) => ({
      baseStat: stat.base_stat,
      name: stat.stat.name,
    }));
    let abilitiesArray = listPokemon[i].abilities.map(
      (ability) => ability.ability.name
    );
    let description = listDescription[i].flavor_text_entries[0].flavor_text;
    lastList.push({
      sprites: [
        listPokemon[i].sprites.front_default,
        listPokemon[i].sprites.back_default,
        listPokemon[i].sprites.front_shiny,
        listPokemon[i].sprites.back_shiny,
      ],
      name: listPokemon[i].name,
      types: typesArray,
      id: listPokemon[i].id,
      height: listPokemon[i].height,
      weight: listPokemon[i].weight,
      abilities: abilitiesArray,
      stats: statsArray,
      description: description,
    });
  }
  //console.log(finalList);
  return lastList;
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
