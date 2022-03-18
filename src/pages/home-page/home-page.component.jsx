import "./home-page.styles.scss";
import {
  getPokemonList,
  getCurrentPokemon,
  getPokemonDescription,
} from "./utilities";
import React, { useEffect, useState } from "react";
import DropDownList from "../../components/drop-down-list/drop-down-list.component";
import PortraitContainer from "../../components/portrait-container/portrait-container.component";
import SpriteContainer from "../../components/sprite-container/sprite-container.component";
import Description from "../../components/description/description.component";

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
  const [stats, setStats] = useState(null);
  const [description, setDescription] = useState(null);
  const [abilities, setAbilities] = useState(null);

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
      setSprite([
        currentPokemon.sprites.front_default,
        currentPokemon.sprites.back_default,
        currentPokemon.sprites.front_shiny,
        currentPokemon.sprites.back_shiny,
      ]);

      setTypes(currentPokemon.types.map((thing) => thing.type.name));
      setHeight(currentPokemon.height);
      setWeight(currentPokemon.weight);
      setName(currentPokemon.name);
      setAbilities(
        currentPokemon.abilities.map((ability) => ability.ability.name)
      );
      setStats(
        currentPokemon.stats.map((stat) => ({
          baseStat: stat.base_stat,
          name: stat.stat.name,
        }))
      );
      console.log(types);
    }
  }, [currentPokemon]);
  function prevPokemon() {
    if (currentPokemonID === 1) {
      return;
    }
    setCurrentPokemonID((prev) => prev - 1);
  }
  function nextPokemon() {
    if (currentPokemonID === 151) {
      return;
    }
    setCurrentPokemonID((prev) => prev + 1);
  }
  return (
    <div className="home-page">
      <DropDownList
        options={pokemonList}
        onChange={(event) => setCurrentPokemonID(event.target.value)}
      />

      <PortraitContainer>
        <SpriteContainer imageLinks={sprite} />
        <Description
          name={name}
          height={height}
          weight={weight}
          description={description}
          types={types}
          id={currentPokemonID}
          stats={stats}
          abilities={abilities}
        />
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
  );
};

export default HomePage;
