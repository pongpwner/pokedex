import React, { useState, useEffect } from "react";
import "./show-all.styles.scss";
import PokemonCard from "../../components/pokemon-card/pokemon-card.component";
import Loading from "../../components/loading/loading.component";
import { usePokemonListWithInfo } from "../../contexts/global-contexts";
import CustomDropdown from "../../components/custom-dropdown/custom-dropdown.component";

const ShowAll = () => {
  let pokemonList = usePokemonListWithInfo();
  const sortByList = [
    "number(asc)",
    "number(des)",
    "alphabetical(asc)",
    "alphabetical(des)",
  ];
  const filterByList = ["region", "type"];
  const [displayList, setDisplayList] = useState(null);
  const [value, setValue] = useState(0); // integer state
  //return () => setValue(value => value + 1); // update the state to force render
  const [sortValue, setSortValue] = useState("number");
  function sortAplhabeticalAsc() {
    let pkList = [...pokemonList];
    const sortedList = pkList.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    console.log(sortedList);
    setDisplayList(sortedList);
    console.log(displayList);
  }

  function sortAplhabeticalDes() {
    let pkList = [...pokemonList];
    const sortedList = pkList.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? 1 : textA > textB ? -1 : 0;
    });
    console.log(sortedList);
    setDisplayList(sortedList);
    console.log(displayList);
  }
  function sortNumericalAsc() {
    let pkList = [...pokemonList];
    let sortedList = pkList.sort(function (a, b) {
      return a.id - b.id;
    });
    setDisplayList(sortedList);
    console.log(displayList);
  }
  function sortNumericalDes() {
    let pkList = [...pokemonList];
    let sortedList = pkList.sort(function (a, b) {
      return b.id - a.id;
    });
    setDisplayList(sortedList);
    console.log(displayList);
  }
  useEffect(() => {
    console.log(pokemonList);
    if (pokemonList) {
      setDisplayList(pokemonList);
    }
  }, [pokemonList]);
  useEffect(() => {
    console.log(displayList);
    return () => setValue((value) => value + 1); // update the state to force render
  }, [displayList]);

  //sort list
  useEffect(() => {
    if (pokemonList) {
      console.log(sortValue);
      switch (sortValue) {
        case "alphabetical(asc)":
          sortAplhabeticalAsc();
          return;
        case "alphabetical(des)":
          sortAplhabeticalDes();
          return;

        case "number(asc)":
          sortNumericalAsc();
          return;
        case "number(des)":
          sortNumericalDes();
          return;
        default:
          return;
      }
    }
  }, [sortValue, pokemonList]);
  return displayList ? (
    <div className="show-all">
      <div className="dropdown-section">
        <CustomDropdown
          label="sort by"
          list={sortByList}
          listname="sort"
          onChange={setSortValue}
        />
        <CustomDropdown
          label="filter by"
          list={filterByList}
          listname="filter"
        />
      </div>
      <div className="pokemon-list">
        {displayList
          ? displayList.map((pokemon) => (
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
    </div>
  ) : (
    <Loading />
  );
};
export default ShowAll;
