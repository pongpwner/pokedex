import "./home-page.styles.scss";
import {
  getPokemonList,
  getCurrentPokemon,
  getPokemonDescription,
} from "./utilities";
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

  //props to display on the pokedex
  const [sprite, setSprite] = useState(null);
  const [types, setTypes] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  //gets pokemon list
  useEffect(() => {
    async function getData() {
      const pokemonList = await getPokemonList();
      console.log(pokemonList);
      setPokemonList(pokemonList);
    }
    getData();
  }, []);

  //gets current pokemon and its decription
  useEffect(() => {
    async function getData() {
      const data = await getCurrentPokemon(currentPokemonID);
      setCurrentPokemon(data);
      const data1 = await getPokemonDescription(currentPokemonID);
      setDescription(data1);
    }
    getData();
  }, [currentPokemonID]);

  //gets property from current pokemon
  useEffect(() => {
    if (currentPokemon) {
      setSprite(currentPokemon.sprites.front_default);
      setTypes(currentPokemon.types);
      setHeight(currentPokemon.height);
      setWeight(currentPokemon.weight);
      setName(currentPokemon.name);
    }
  }, [currentPokemon]);

  return (
    <div className="home-page">
      <DropDownList
        options={pokemonList}
        onChange={(event) => setCurrentPokemonID(event.target.value)}
      />

      <img src={sprite} alt="pokemon"></img>
      <div className="s">{height}</div>
      <div className="s">{weight}</div>
      <div className="s">{name}</div>
      <div className="s">{description}</div>
      <PortraitContainer></PortraitContainer>
    </div>
  );
};

export default HomePage;
