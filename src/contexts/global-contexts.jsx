import React, { useState, useEffect, useContext } from "react";
import {
  getPokemonList,
  getCurrentPokemon,
  getPokemonListWithInfo,
  getEvolutionChain,
} from "./utilities";

const PokemonListContext = React.createContext(null);
export function usePokemonList() {
  return useContext(PokemonListContext);
}

const PokemonListWithInfoContext = React.createContext(null);

export function usePokemonListWithInfo() {
  return useContext(PokemonListWithInfoContext);
}

const CurrentPokemonId = React.createContext(1);
const UpdateCurrentPokemonId = React.createContext();
const SelectCurrentPokemonId = React.createContext();
export function useSelectCurrentPokemonId() {
  return useContext(SelectCurrentPokemonId);
}
export function useCurrentPokemonId() {
  return useContext(CurrentPokemonId);
}
export function useUpdateCurrentPokemonId() {
  return useContext(UpdateCurrentPokemonId);
}
const EvolutionChain = React.createContext();
const UpdateEvolutionChain = React.createContext();
export function useEvolutionChain() {
  return useContext(EvolutionChain);
}
export function useUpdateEvolutionChain(url) {
  return useContext(UpdateEvolutionChain);
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
  const [currentPokemonID, setCurrentPokemonID] = useState(118);
  function changeId(num) {
    return setCurrentPokemonID((prev) => prev + num);
  }

  //grabs list of all pokemon names and url
  const [pokemonList, setPokemonList] = useState(null);

  //grabs list of all pokemon names and url
  const [pokemonListWithTypes, setPokemonListWithTypes] = useState(null);

  //holds info from an api call
  const [currentPokemon, setCurrentPokemon] = useState(null);

  //list of pokemon evolutions
  const [evolutionChain, setEvolutionChain] = useState(null);

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
      //console.log(urls);
      async function getData() {
        const data = await getPokemonListWithInfo(urls);
        setPokemonListWithTypes(data);
      }
      getData();
    }
  }, [pokemonList]);
  //gets current pokemon and its decription
  useEffect(() => {
    if (currentPokemonID) {
      async function getData() {
        const currentPokemon = await getCurrentPokemon(currentPokemonID);
        setCurrentPokemon(currentPokemon);
      }
      getData();
    }
  }, [currentPokemonID]);

  // gets evolution chain
  useEffect(() => {
    if (currentPokemon) {
      async function getData() {
        const evolutionChain = await getEvolutionChain(
          currentPokemon.evolutionChain
        );
        setEvolutionChain(evolutionChain);
      }
      getData();
    }
  }, [currentPokemon]);

  return (
    <SelectCurrentPokemonId.Provider value={setCurrentPokemonID}>
      <UpdateEvolutionChain.Provider value={setEvolutionChain}>
        <EvolutionChain.Provider value={evolutionChain}>
          <PokemonListWithInfoContext.Provider value={pokemonListWithTypes}>
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
          </PokemonListWithInfoContext.Provider>
        </EvolutionChain.Provider>
      </UpdateEvolutionChain.Provider>
    </SelectCurrentPokemonId.Provider>
  );
};
