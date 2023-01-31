import React, { useState, useContext } from "react";
import "./pokemon-card.styles.scss";
import EvolutionChain from "../evolution-chain/evolution-chain.component";
import SpriteContainer from "../sprite-container/sprite-container.component";
import Modal from "../modal/modal.component";
import { typeColorGradient } from "./pokemon-card.utils";
import {
  useCurrentPokemonId,
  useEvolutionChain,
  useUpdateEvolutionChain,
  useCurrentPokemon,
  useSelectCurrentPokemonId,
  useUpdateCurrentPokemon,
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
  const [disabled, setDisabled] = useState(false);
  let gradientColors = typeColorGradient(types);
  let gradientColor1 = gradientColors[0];
  let gradientColor2 = gradientColors[1];
  let currentPokemonID = useCurrentPokemonId();

  let setEvolutionChain = useUpdateEvolutionChain();
  let evolutionChain = useEvolutionChain();
  let currentPokemon = useCurrentPokemon();
  let selectPokemonId = useSelectCurrentPokemonId();
  let setCurrentPokemon = useUpdateCurrentPokemon();

  function closeModal(e) {
    //reset current pokemon to null to prevent visual lag
    setIsModalOpen(false);
    setCurrentPokemon(null);
    selectPokemonId(null);
    setEvolutionChain(null);
    e.stopPropagation();
  }
  function openModal() {
    selectPokemonId(id);
    if (currentPokemon) {
      setEvolutionChain(currentPokemon.evolution_chain);
    }
    setIsModalOpen(true);
  }
  //appending 0's in front of id for display purposes
  let pokemonNumber = id;
  let currentPokemonNumber = currentPokemonID ? currentPokemonID : "";
  if (currentPokemonNumber.toString().length < 3) {
    if (currentPokemonNumber.toString().length === 1) {
      currentPokemonNumber = "0" + "0" + currentPokemonID;
    } else {
      currentPokemonNumber = "0" + currentPokemonID;
    }
  }

  if (pokemonNumber.toString().length < 3) {
    if (pokemonNumber.toString().length === 1) {
      pokemonNumber = "0" + "0" + id;
    } else {
      pokemonNumber = "0" + id;
    }
  }
  //iterate through pokemon on modal
  function prevPokemon() {
    if (currentPokemonID === 1) {
      return;
    }
    selectPokemonId((prev) => prev - 1);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }
  const nextPokemon = () => {
    if (currentPokemonID === 898) {
      return;
    }
    selectPokemonId((prev) => prev + 1);
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  return (
    <>
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
          <div className="id"> #{pokemonNumber}</div>
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
      </div>
      <Modal
        currentPokemon={currentPokemon}
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <div className="container-flex-column background align-center pokemon-info-grid ">
          <div className="navi">
            <button
              type="button"
              className="next-button nav-button"
              disabled={disabled}
              onClick={(e) => {
                prevPokemon();
                e.stopPropagation();
              }}
            >
              &lt;
            </button>

            <div className="id">
              #{currentPokemonNumber ? currentPokemonNumber : ""}
            </div>
            <button
              type="button"
              disabled={disabled}
              className="prev-button nav-button"
              onClick={(e) => {
                nextPokemon();
                e.stopPropagation();
              }}
            >
              &gt;
            </button>
          </div>
          <h1 className="name"> {currentPokemon ? currentPokemon.name : ""}</h1>
          <div className="sprite-container">
            <SpriteContainer />
          </div>

          <div className="types-container">
            {currentPokemon
              ? currentPokemon.types.map((type, idx) => (
                  <div key={idx} className={`type ${type} `}>
                    &nbsp;
                  </div>
                ))
              : ""}
          </div>
          <div className="size">
            <div className="weight">
              weight: {currentPokemon ? currentPokemon.weight / 10 : ""}kg
            </div>
            <div className="height">
              height: {currentPokemon ? currentPokemon.height * 10 : ""}cm
            </div>
          </div>
        </div>
        <h2 className="heading2 description-grid">Description</h2>
        <div className="background description-grid">
          <div className="pokemon-description">
            {currentPokemon ? currentPokemon.description : ""}
          </div>
        </div>
        <h2 className="heading2 stat-grid">Base Stats</h2>
        <div className="stat-list background stat-grid">
          {currentPokemon
            ? currentPokemon.stats.map((stat, id) => (
                <div key={id} className="stat">
                  <div className="stat-name">{stat.name}</div>
                  <div className="stat-value"> {stat.baseStat}</div>
                </div>
              ))
            : ""}
        </div>
        <h2 className="heading2 ability-grid">Abilities</h2>
        <div className="abilities background ability-grid ">
          <div className="abilities-list">
            {currentPokemon
              ? currentPokemon.abilities.map((ability, id) => (
                  <div key={id} className="ability">
                    {ability}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <h2 className="heading2 evolution-grid">Evolution</h2>
        <div className="background evolution-grid">
          <EvolutionChain evolutionChain={evolutionChain} />
        </div>
      </Modal>
    </>
  );
};

export default PokemonCard;
