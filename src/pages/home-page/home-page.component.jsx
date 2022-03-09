import "./home-page.styles.scss";
import { getPokemonList, getCurrentPokemon } from "./utilities";
import React, { useEffect, useState } from "react";
import DropDownList from "../../components/drop-down-list/drop-down-list.component";
import PortraitContainer from "../../components/portrait-container/portrait-container.component";

const HomePage = () => {
  //id retrieved from dropdown list
  const [currentPokemonID, setCurrentPokemonID] = useState(1);

  //grabs list of all pokemon names and url
  const [pokemonList, setPokemonList] = useState(null);

  //holds info from an api call
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const [sprite, setSprite] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  );

  //gets pokemon list
  useEffect(() => {
    async function getData() {
      const pokemonList = await getPokemonList();
      console.log(pokemonList);
      setPokemonList(pokemonList);
    }
    getData();
  }, []);

  //gets current pokemon
  useEffect(() => {
    async function getData() {
      const data = await getCurrentPokemon(currentPokemonID);
      setCurrentPokemon(data);
    }
    getData();
  }, [currentPokemonID]);

  //gets property from current pokemon
  useEffect(() => {
    if (currentPokemon) {
      setSprite(currentPokemon.sprites.front_default);
    }
  }, [currentPokemon]);

  return (
    <div className="home-page">
      <DropDownList
        options={pokemonList}
        onChange={(event) => setCurrentPokemonID(event.target.value)}
      />
      {currentPokemon && <div>{currentPokemon.species.name}</div>}
      <img src={sprite} alt="pokemon"></img>
      <PortraitContainer></PortraitContainer>
    </div>
  );
};

export default HomePage;
