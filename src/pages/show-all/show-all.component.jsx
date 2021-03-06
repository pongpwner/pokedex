import React, { useState, useEffect } from "react";
import "./show-all.styles.scss";
import PokemonCard from "../../components/pokemon-card/pokemon-card.component";
import Loading from "../../components/loading/loading.component";
import { usePokemonListWithInfo } from "../../contexts/global-contexts";
import CustomDropdown from "../../components/custom-dropdown/custom-dropdown.component";

const ShowAll = () => {
  //list of all pokemon
  let pokemonList = usePokemonListWithInfo();
  const sortByList = [
    "number(asc)",
    "number(des)",
    "alphabetical(asc)",
    "alphabetical(des)",
  ];
  const filterByTypeList = [
    "all",
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
  ];
  const filterByTypeList2 = [
    "none",
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
  ];
  //list that is rendered by dom
  const [displayList, setDisplayList] = useState(null);

  //used for filter calculations
  const [filterList, setFilterList] = useState(null);
  const [filterList2, setFilterList2] = useState(null);

  //values of the select inputs
  const [sortValue, setSortValue] = useState("number(asc)");
  const [filterValue, setFilterValue] = useState("all");
  const [filterValue2, setFilterValue2] = useState("none");

  //functions for sorting pokemon
  function sortAplhabeticalAsc() {
    let pkList = [...filterList2];
    const sortedList = pkList.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    setDisplayList(sortedList);
  }

  function sortAplhabeticalDes() {
    let pkList = [...filterList2];
    const sortedList = pkList.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? 1 : textA > textB ? -1 : 0;
    });

    setDisplayList(sortedList);
  }
  function sortNumericalAsc() {
    let pkList = [...filterList2];
    let sortedList = pkList.sort(function (a, b) {
      return a.id - b.id;
    });
    setDisplayList(sortedList);
  }
  function sortNumericalDes() {
    let pkList = [...filterList2];
    let sortedList = pkList.sort(function (a, b) {
      return b.id - a.id;
    });
    setDisplayList(sortedList);
  }

  //filters first type
  function filterByType() {
    if (filterValue === "all") {
      //sets to original list of pokemon if all types are selected
      setFilterList(pokemonList);
      return;
    }
    //reset filter
    setFilterList(pokemonList);

    let pkList = [...pokemonList];
    let filteredList = pkList.filter((pokemon) => {
      return pokemon.types.includes(filterValue);
    });

    setFilterList(filteredList);
  }

  //filters 2nd type
  function filterByType2() {
    if (filterValue2 !== "none") {
      console.log("filter2");
      let pkList = [...filterList];
      let filteredList = pkList.filter((pokemon) => {
        return pokemon.types.includes(filterValue2);
      });
      console.log(filteredList);
      setFilterList2(filteredList);
    }
  }
  useEffect(() => {
    console.log(pokemonList);
    if (pokemonList) {
      let pkList = [...pokemonList];
      setDisplayList(pkList);
      //setSortList(pkList);
      setFilterList(pkList);
    }
  }, [pokemonList]);
  useEffect(() => {
    console.log(displayList);
  }, [displayList]);

  //sort list
  useEffect(() => {
    if (filterList) {
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
  }, [sortValue]);

  //calls filter function when the select tyoe filters are changed
  useEffect(() => {
    if (pokemonList) {
      filterByType();
    }
  }, [filterValue, filterValue2]);

  //called when the first select tag is changed
  useEffect(() => {
    if (filterValue2 === "none") {
      //if second type tag is none, set next filter equal to the current one
      setFilterList2(filterList);
      return;
    }
    filterByType2();
  }, [filterList]);

  //called by method above, filters 2nd type select, the applies the  selected sort
  useEffect(() => {
    if (!filterList2) {
      return;
    }
    //apply the selected sort after both filters have been applied
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
  }, [filterList2]);
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
          label="filter by type"
          list={filterByTypeList}
          listname="filter"
          onChange={setFilterValue}
        />
        <CustomDropdown
          label="filter by type"
          list={filterByTypeList2}
          listname="filter2"
          onChange={setFilterValue2}
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
