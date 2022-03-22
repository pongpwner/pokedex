import { getAllByAltText } from "@testing-library/react";
import React from "react";
import "./show-all.styles.scss";
import PokemonCard from "../../components/pokemon-card/pokemon-card.component";
import { usePokemonListWithTypes } from "../../contexts/global-contexts";
import { Link } from "react-router-dom";
const ShowAll = () => {
  let pokemonList = usePokemonListWithTypes();
  return (
    <div className="show-all">
      <Link to="/"> Home</Link>
      {pokemonList
        ? pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              id={pokemon.id}
              sprites={pokemon.sprites}
            />
          ))
        : null}
    </div>
  );
};
export default ShowAll;
// <Link to="/"> Home</Link>
