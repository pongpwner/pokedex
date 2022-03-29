import React from "react";
import "./show-all.styles.scss";
import PokemonCard from "../../components/pokemon-card/pokemon-card.component";
import Loading from "../../components/loading/loading.component";
import { usePokemonListWithInfo } from "../../contexts/global-contexts";

const ShowAll = () => {
  let pokemonList = usePokemonListWithInfo();
  return pokemonList ? (
    <div className="show-all">
      {pokemonList
        ? pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              id={pokemon.id}
              sprites={pokemon.sprites}
              stats={pokemon.stats}
              weight={pokemon.weight}
              height={pokemon.height}
              abilities={pokemon.abilities}
              description={pokemon.description}
            />
          ))
        : null}
    </div>
  ) : (
    <Loading />
  );
};
export default ShowAll;
