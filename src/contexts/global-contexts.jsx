import React, { useState, useEffect, useContext } from "react";
import {
  getPokemonList,
  getCurrentPokemon,
  getPokemonListWithTypes,
} from "./utilities";

const PokemonListContext = React.createContext(null);
export function usePokemonList() {
  return useContext(PokemonListContext);
}

const PokemonListWithTypesContext = React.createContext(null);

export function usePokemonListWithTypes() {
  return useContext(PokemonListWithTypesContext);
}

const CurrentPokemonId = React.createContext(1);
const UpdateCurrentPokemonId = React.createContext();
export function useCurrentPokemonId() {
  return useContext(CurrentPokemonId);
}
export function useUpdateCurrentPokemonId() {
  return useContext(UpdateCurrentPokemonId);
}
const CurrentPokemon = React.createContext(null);
const UpdateCurrentPokemon = React.createContext(null);
export function useCurrentPokemon() {
  return useContext(CurrentPokemon);
}
export function useUpdateCurrentPokemon() {
  return useContext(UpdateCurrentPokemon);
}
//////////////////////////////////////////////////////////////////////
export const GlobalContextProvider = ({ children }) => {
  //id retrieved from dropdown list
  const [currentPokemonID, setCurrentPokemonID] = useState(1);
  function changeId(num) {
    return setCurrentPokemonID((prev) => prev + num);
  }

  //grabs list of all pokemon names and url
  const [pokemonList, setPokemonList] = useState(null);

  //grabs list of all pokemon names and url
  const [pokemonListWithTypes, setPokemonListWithTypes] = useState(null);

  //holds info from an api call
  const [currentPokemon, setCurrentPokemon] = useState(null);

  //gets pokemon list
  useEffect(() => {
    async function getData() {
      const pokemonList = await getPokemonList();

      setPokemonList(pokemonList);
    }
    getData();
  }, []);

  //gets pokemon list with their types

  useEffect(() => {
    if (pokemonList) {
      const urls = pokemonList.map((pokemon) => pokemon.url);
      console.log(urls);
      async function getData() {
        const data = await getPokemonListWithTypes(urls);
        setPokemonListWithTypes(data);
      }
      getData();
    }
  }, [pokemonList]);
  //gets current pokemon and its decription
  useEffect(() => {
    async function getData() {
      const data = await getCurrentPokemon(currentPokemonID);
      setCurrentPokemon(data);
    }
    getData();
  }, [currentPokemonID]);

  return (
    //<updateCurrentPokemon value={setCurrentPokemon }>
    // <CurrentPokemon.Provider value={currentPokemon}>
    // <currentPokemonID.Provider value={currentPokemonID}>
    //  <useUpdateCurrentPokemonId.Provider value={changeId}>
    // <PokemonListContext.Provider value={pokemonList}>
    //   {children}
    // </PokemonListContext.Provider>
    //  </useUpdateCurrentPokemonId.Provider>
    // </currentPokemonID.Provider>
    // </CurrentPokemon.Provider>
    // </updateCurrentPokemon>
    <PokemonListWithTypesContext.Provider value={pokemonListWithTypes}>
      <UpdateCurrentPokemonId.Provider value={changeId}>
        <CurrentPokemonId.Provider value={currentPokemonID}>
          <UpdateCurrentPokemon.Provider value={setCurrentPokemon}>
            <CurrentPokemon.Provider value={currentPokemon}>
              <PokemonListContext.Provider value={pokemonList}>
                {children}
              </PokemonListContext.Provider>
            </CurrentPokemon.Provider>
          </UpdateCurrentPokemon.Provider>
        </CurrentPokemonId.Provider>
      </UpdateCurrentPokemonId.Provider>
    </PokemonListWithTypesContext.Provider>
  );
};
