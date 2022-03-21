import "./pokemon-details.styles.scss";
// import {
//   getPokemonList,
//   getCurrentPokemon,
//   getPokemonDescription,
// } from "./utilities";
import React, { useEffect, useState } from "react";
import DropDownList from "../../components/drop-down-list/drop-down-list.component";
import PortraitContainer from "../../components/portrait-container/portrait-container.component";
import SpriteContainer from "../../components/sprite-container/sprite-container.component";
import Description from "../../components/description/description.component";
import {
  usePokemonList,
  useCurrentPokemon,
  useCurrentPokemonId,
  useUpdateCurrentPokemonId,
} from "../../contexts/global-contexts";

const PokemonDetails = () => {
  const pokemonList = usePokemonList();
  const currentPokemon = useCurrentPokemon();
  const currentPokemonID = useCurrentPokemonId();
  const changeId = useUpdateCurrentPokemonId();
  // ////////////

  function prevPokemon() {
    if (currentPokemonID === 1) {
      return;
    }
    changeId(-1);
  }
  const nextPokemon = () => {
    if (currentPokemonID === 151) {
      return;
    }
    changeId(1);
  };
  return currentPokemon ? (
    <div className="home-page">
      <DropDownList
        options={pokemonList}
        value={currentPokemonID}
        onChange={(event) => changeId(event.target.value - currentPokemonID)}
      />

      <PortraitContainer>
        <SpriteContainer />
        <Description />
      </PortraitContainer>
      <div className="button-container">
        <button type="button" className="next-button" onClick={prevPokemon}>
          Prev
        </button>
        <button type="button" className="prev-button" onClick={nextPokemon}>
          Next
        </button>
      </div>
    </div>
  ) : null;
};

export default PokemonDetails;
