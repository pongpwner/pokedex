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

  const [displayList, setDisplayList] = useState(null);

  const [filterList, setFilterList] = useState(null);
  const [filterList2, setFilterList2] = useState(null);
  const [sortValue, setSortValue] = useState("number(asc)");
  const [filterValue, setFilterValue] = useState("all");
  const [filterValue2, setFilterValue2] = useState("none");
  function sortAplhabeticalAsc() {
    let pkList = [...filterList2];
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
    let pkList = [...filterList2];
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
    let pkList = [...filterList2];
    let sortedList = pkList.sort(function (a, b) {
      return a.id - b.id;
    });
    setDisplayList(sortedList);

    console.log(sortedList);
  }
  function sortNumericalDes() {
    let pkList = [...filterList2];
    let sortedList = pkList.sort(function (a, b) {
      return b.id - a.id;
    });
    setDisplayList(sortedList);

    console.log(displayList);
  }
  function filterByType() {
    console.log(filterValue);
    if (filterValue === "all") {
      setFilterList(pokemonList);
      return;
    }
    // if (filterValue2 === "none") {
    //   setFilterList(pokemonList);
    // }
    setFilterList(pokemonList);
    console.log(pokemonList);
    let pkList = [...pokemonList];
    let filteredList = pkList.filter((pokemon) => {
      return pokemon.types.includes(filterValue);
    });
    console.log("filteredList" + filteredList);
    setFilterList(filteredList);
  }
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
  useEffect(() => {
    if (pokemonList) {
      filterByType();
    }
  }, [filterValue, filterValue2]);
  useEffect(() => {
    if (filterValue2 === "none") {
      setFilterList2(filterList);
      return;
    }
    filterByType2();
  }, [filterList]);
  useEffect(() => {
    if (!filterList2) {
      return;
    }
    console.log("change");
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
