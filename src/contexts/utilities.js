export async function getPokemonDescription(id) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((response) => response.json());

  //console.log(data);
  return data.flavor_text_entries[0].flavor_text;
}

export async function getEvolutionChain(url) {
  const evoChain = await fetch(url).then((res) => res.json());
  let stage2 = evoChain.chain.evolves_to;
  async function getSprite(url) {
    let data = await fetch(
      evoChain.chain.species.url.replace("-species", "")
    ).then((res) => res.json());
    let sprite = data.sprites.front_default;
    return sprite;
  }
  let sprite = await getSprite(evoChain.chain.species.url);
  let chain = {
    stage: "one",
    name: evoChain.chain.species.name,
    url: evoChain.chain.species.url,
    sprite: sprite,
    evolvesTo: [],
  };
  //console.log(stage2);
  if (stage2.length > 0) {
    chain.evolvesTo = await Promise.all(
      stage2.map(async (pokemon) => {
        let sprite = await fetch(
          pokemon.species.url.replace("-species", "")
        ).then((res) => res.json());

        return {
          name: pokemon.species.name,
          sprite: sprite.sprites.front_default,
          url: pokemon.species.url,
          evolvesTo: await Promise.all(
            pokemon.evolves_to.map(async (pokemon) => {
              let sprite1 = await fetch(
                pokemon.species.url.replace("-species", "")
              ).then((res) => res.json());
              //console.log(pokemon.species.name);
              //console.log(pokemon.species.url);
              //console.log(sprite1);
              if (pokemon.evolves_to.length === 0) {
                return {
                  name: pokemon.species.name,
                  url: pokemon.species.url,
                  sprite: sprite1.sprites.front_default,
                };
              }

              return {
                name: pokemon.species.name,
                sprite: sprite1.sprites.front_default,
                url: pokemon.species.url,
                evolvesTo: pokemon.evolves_to.map((pokemon) => {
                  if (pokemon.evolves_to.length === 0) {
                    return {
                      name: pokemon.species.name,
                      url: pokemon.species.url,
                    };
                  }
                  return {
                    name: pokemon.species.name,
                    url: pokemon.species.url,
                    sprite: getSprite(pokemon.species.url),
                  };
                }),
              };
            })
          ),
        };
      })
    );
    // console.log(chain);
    return chain;
  }

  //evolution stage1
  // let stage2;
  // let stage3;
  // let stage4;
  // if (evoChain.chain.evolves_to.length === 0) {
  //   return chain;
  // }
  // //evolution stage2
  // if (evoChain.chain.evolves_to.length > 0) {
  //   chain.evolvesTo = evoChain.chain.evolves_to.map((evo) => ({
  //     stage: "two",
  //     name: evo.species.name,
  //     url: evo.species.url,
  //     evolvesTo: [],
  //   }));
  //evoChain.evolves_to.forEach((pokemon) => {});

  //evolution stage3
  // if (evoChain.chain.evolves_to[0].evolves_to.length > 0) {
  //   stage3 = evoChain.chain.evolves_to[0].evolves_to.map((evo) => ({
  //     name: evo.species.name,
  //     url: evo.species.url,
  //   }));
  //   chain.push(stage3);
  //   //evolution stage4
  //   if (evoChain.chain.evolves_to[0].evolves_to[0].evolves_to.length > 0) {
  //     stage4 = evoChain.chain.evolves_to.map((evo) => ({
  //       name: evo.species.name,
  //       url: evo.species.url,
  //     }));
  //     chain.push(stage4);
  //   }
  // }
  // }
  // let flatChain=evoChain.chain
  // console.log(evoChain);
  // return evoChain;
}

export async function getPokemonList() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10").then(
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
  //console.log(listPokemon);
  //console.log(listDescription);
  let lastList = [];

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
      evolutionChain: listDescription[i].evolution_chain.url,
    });
  }
  //console.log(lastList);
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
    evolutionChain: data1.evolution_chain.url,
  };
}
