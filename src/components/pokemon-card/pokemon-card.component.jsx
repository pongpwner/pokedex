import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pokemon-card.styles.scss";
import EvolutionChain from "../evolution-chain/evolution-chain.component";
import SpriteContainer from "../sprite-container/sprite-container.component";
import Modal from "../modal/modal.component";
import { typeColorGradient } from "./pokemon-card.utils";
import {
  useCurrentPokemonId,
  useUpdateCurrentPokemonId,
  useEvolutionChain,
  useUpdateEvolutionChain,
  useCurrentPokemon,
  useSelectCurrentPokemonId,
} from "../../contexts/global-contexts";
const PokemonCard = ({
  name,
  types,
  id,
  sprites,
  stats,
  weight,
  height,
  abilities,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let gradientColors = typeColorGradient(types);
  let gradientColor1 = gradientColors[0];
  let gradientColor2 = gradientColors[1];
  let currentPokemonID = useCurrentPokemonId();
  let changeId = useUpdateCurrentPokemonId();
  let setEvolutionChain = useUpdateEvolutionChain();
  let evolutionChain = useEvolutionChain();
  let currentPokemon = useCurrentPokemon();
  let selectPokemonId = useSelectCurrentPokemonId();
  function prevPokemon() {
    if (currentPokemonID === 1) {
      return;
    }
    selectPokemonId((prev) => prev - 1);
    console.log(currentPokemonID);
    //changeId(-1);
  }
  const nextPokemon = () => {
    if (currentPokemonID === 151) {
      return;
    }
    selectPokemonId((prev) => prev + 1);
    console.log(currentPokemonID);
    //changeId(1);
  };
  function openModal() {
    if (currentPokemonID !== id) {
      selectPokemonId(id);
      //getData();
      // console.log(currentPokemon);
      setEvolutionChain(currentPokemon.evolution_chain);
      //console.log(evolutionChain);
      setIsModalOpen(true);
    }
    //console.log(currentPokemonID);
    // async function getData() {
    //   await selectPokemonId(id);
    // }
  }
  return (
    <div className={`pokemon-card `} onClick={openModal}>
      <div
        style={{
          background: `linear-gradient(${gradientColor1},${gradientColor2})`,
        }}
        className="card-side card-side-front"
      >
        <div className="sprite-container">
          <div className="circle">&nbsp;</div>
          <img className="sprite" src={sprites[0]} alt="pokemon" />
        </div>
        <h1 className="name"> {name}</h1>
        <div className="id"> #{id}</div>
        <div className="types-container">
          {types.map((type, idx) => (
            <div key={idx} className={`type ${type} `}>
              &nbsp;
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: `linear-gradient(${gradientColor1},${gradientColor2})`,
        }}
        className="card-side card-side-back"
      >
        <h1 className="name"> {name}</h1>

        <div className="pokemon-description">{description}</div>
        <div className="size">
          <div className="weight">weight: {weight / 10}kg</div>
          <div className="height">height: {height}cm</div>
        </div>
        <div className="stats">
          <h2 className="heading2">Base Stats</h2>
          {stats.map((stat, id) => (
            <div key={id} className="stat">
              {stat.name}: {stat.baseStat}
            </div>
          ))}
        </div>

        <div className="abilities ">
          <h2 className="heading2">Abilities</h2>
          <div className="abilities-list">
            {abilities.map((ability, id) => (
              <div key={id} className="ability">
                {ability}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={(e) => {
          setIsModalOpen(false);
          e.stopPropagation();
        }}
      >
        <div className="container-flex-column background align-center">
          <div className="navi">
            <button
              type="button"
              className="next-button"
              onClick={(e) => {
                prevPokemon();
                e.stopPropagation();
              }}
            >
              Prev
            </button>

            <div className="id"> #{currentPokemon.id}</div>
            <button
              type="button"
              className="prev-button"
              onClick={(e) => {
                nextPokemon();
                e.stopPropagation();
              }}
            >
              Next
            </button>
          </div>
          <div className="sprite-container">
            <SpriteContainer />
          </div>
          <h1 className="name"> {currentPokemon.name}</h1>

          <div className="types-container">
            {currentPokemon.types.map((type, idx) => (
              <div key={idx} className={`type ${type} `}>
                &nbsp;
              </div>
            ))}
          </div>
          <div className="size">
            <div className="weight">weight: {currentPokemon.weight / 10}kg</div>
            <div className="height">height: {currentPokemon.height * 10}cm</div>
          </div>
        </div>
        <h2 className="heading2">Description</h2>
        <div className="background">
          <div className="pokemon-description">
            {currentPokemon.description}
          </div>
        </div>
        <h2 className="heading2">Base Stats</h2>
        <div className="stat-list background">
          {currentPokemon.stats.map((stat, id) => (
            <div key={id} className="stat">
              <div className="stat-name">{stat.name}</div>
              <div className="stat-value"> {stat.baseStat}</div>
            </div>
          ))}
        </div>
        <h2 className="heading2">Abilities</h2>
        <div className="abilities background ">
          <div className="abilities-list">
            {currentPokemon.abilities.map((ability, id) => (
              <div key={id} className="ability">
                {ability}
              </div>
            ))}
          </div>
        </div>
        <h2 className="heading2">Evolution</h2>
        <div className="background">
          <EvolutionChain evolutionChain={evolutionChain} />
        </div>
      </Modal>
    </div>
  );
};

export default PokemonCard;
