//fetches gen 1 pokemon list with name and url for more info
export async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json().then((res) => res.results);
}

async function getSprite(url) {
  let data = await fetch(url.replace("-species", "")).then((res) => res.json());
  let sprite = data.sprites.front_default;
  return sprite;
}

export async function getEvolutionChain(url) {
  if (url === null) return;
  //get first pokemon in the evolution chain
  const evoChain = await fetch(url).then((res) => res.json());
  //get second pokemon in evolution chain
  let stage2 = evoChain.chain.evolves_to;

  let sprite = await getSprite(evoChain.chain.species.url);
  let chain = {
    stage: "one",
    name: evoChain.chain.species.name,
    url: evoChain.chain.species.url,
    sprite: sprite,
    evolvesTo: [],
  };

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

    return new Promise((resolve, reject) => {
      if (chain) {
        resolve(chain);
      } else {
        reject("failed");
      }
    });
  }
}

//iterates through list of all pokemon and fetches information and combines relevant information into an array of objects
export async function getPokemonListWithInfo(pokemonList) {
  if (pokemonList === null) return;
  //get list of pokemon
  const listPokemon = await Promise.all(
    pokemonList.map((url, pokemonId) => {
      let pokemonData = fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      return pokemonData;
    })
  );
  //get pokemon descriptions
  const listDescription = await Promise.all(
    pokemonList.map((url, id) => {
      let pokemonData = fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id + 1}`
      ).then((response) => response.json());
      return pokemonData;
    })
  );

  //this list combines the relevant information from listDescription and pokemonList
  let lastList = [];
  //combine relevant info into lastList
  for (let i = 0; i < listPokemon.length; i++) {
    let typesArray = listPokemon[i].types.map((thing) => thing.type.name);
    let statsArray = listPokemon[i].stats.map((stat) => ({
      baseStat: stat.base_stat,
      name: stat.stat.name,
    }));
    let abilitiesArray = listPokemon[i].abilities.map(
      (ability) => ability.ability.name
    );

    let description = listDescription[i].flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );
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
      description: description[0].flavor_text,
      evolutionChain: listDescription[i].evolution_chain.url,
    });
  }

  return new Promise((resolve, reject) => {
    if (lastList) {
      resolve(lastList);
    } else {
      reject("failed");
    }
  });
}

//gets current pokemon with relevant information
export async function getCurrentPokemon(id) {
  if (id === null) {
    return;
  }
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const response1 = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  if (!response1.ok) {
    throw new Error("Network response was not ok");
  }
  const data1 = await response1.json();

  let typesArray = data.types.map((thing) => thing.type.name);
  let abilitiesArray = data.abilities.map((ability) => ability.ability.name);
  let statsArray = data.stats.map((stat) => ({
    baseStat: stat.base_stat,
    name: stat.stat.name,
  }));

  let pokdexDesciption = data1.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  );

  return new Promise((resolve, reject) => {
    resolve({
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
      description: pokdexDesciption[0].flavor_text,
      id: id,
      evolutionChain: data1.evolution_chain.url,
    });
  });
}
