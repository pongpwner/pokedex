import React, { useState, useEffect, useContext } from "react";
import {
  getPokemonList,
  getCurrentPokemon,
  getPokemonListWithInfo,
  getEvolutionChain,
} from "./utilities";
import { useQuery } from "react-query";
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
////////////////////////////////////////////////////////////////////////////////////////////////
export const GlobalContextProvider = ({ children }) => {
  //id retrieved from dropdown list
  const [currentPokemonID, setCurrentPokemonID] = useState(null);
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

  //get pokemon data
  //maybe call this in show all
  const pokemonQuery = useQuery({
    queryKey: ["pokemonData"],
    queryFn: getPokemonList,
  });

  //gets pokemon list
  useEffect(() => {
    //console.log(pokemonQuery);
    // async function getData() {
    //   const pokemonList = await getPokemonList();

    //   setPokemonList(pokemonList);
    // }
    // getData();
    if (pokemonQuery.data) {
      setPokemonList(pokemonQuery.data);
    }
  }, [pokemonQuery]);

  //gets pokemon list with their types
  const typeQuery = useQuery({
    queryKey: ["types", pokemonList],
    queryFn: () =>
      getPokemonListWithInfo(pokemonList.map((pokemon) => pokemon.url)),
  });
  useEffect(() => {
    // if (pokemonList) {
    //   const urls = pokemonList.map((pokemon) => pokemon.url);
    //   //console.log(urls);
    //   async function getData() {
    //     const data = await getPokemonListWithInfo(urls);
    //     setPokemonListWithTypes(data);
    //   }
    //   getData();
    // }
    if (typeQuery.data) setPokemonListWithTypes(typeQuery.data);
  }, [typeQuery.data]);
  //gets current pokemon and its decription
  const currentPokemonQuery = useQuery({
    queryKey: ["currentPokemon", currentPokemonID],
    queryFn: () => getCurrentPokemon(currentPokemonID),
  });
  useEffect(() => {
    // if (currentPokemonID) {
    //   async function getData() {
    //     const currentPokemon = await getCurrentPokemon(currentPokemonID);
    //     setCurrentPokemon(currentPokemon);
    //   }
    //   getData();
    // }
    if (currentPokemonQuery.data) setCurrentPokemon(currentPokemonQuery.data);
  }, [currentPokemonQuery.data]);

  // gets evolution chain
  const evolutionChainQuery = useQuery({
    queryKey: ["evolutionChain", currentPokemon],
    queryFn: () => getEvolutionChain(currentPokemon.evolutionChain),
  });
  useEffect(() => {
    // if (currentPokemon) {
    //   async function getData() {
    //     const evolutionChain = await getEvolutionChain(
    //       currentPokemon.evolutionChain
    //     );
    //     setEvolutionChain(evolutionChain);
    //   }
    //   getData();
    // }
    //console.log(evolutionChainQuery);
    setEvolutionChain(evolutionChainQuery.data);
  }, [evolutionChainQuery.data]);

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
