import "./home-page.styles.scss";
import React, { useEffect, useState } from "react";
import DropDownList from "../../components/drop-down-list/drop-down-list.component";
import PortraitContainer from "../../components/portrait-container/portrait-container.component";

const HomePage = () => {
  const [currentPokemonURL, setCurrentPokemonURL] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((data) => data.json())
      .then((data) => {
        console.log(data.results);
        setPokemonList(data.results);
      });
  }, []);
  useEffect(() => {
    console.log(currentPokemonURL);
    if (currentPokemonURL) {
      fetch(currentPokemonURL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCurrentPokemon(data);
        });
    }
  }, [currentPokemonURL]);
  return (
    <div className="home-page">
      <DropDownList
        options={pokemonList}
        onChange={(event) => setCurrentPokemonURL(event.target.value)}
      />
      {currentPokemon && <div>{currentPokemon.species.name}</div>}

      <PortraitContainer></PortraitContainer>
    </div>
  );
};

export default HomePage;
