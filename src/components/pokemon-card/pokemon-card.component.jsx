import React from "react";
import { Link } from "react-router-dom";
import "./pokemon-card.styles.scss";
import { typeColorGradient } from "./pokemon-card.utils";
import {
  useCurrentPokemonId,
  useUpdateCurrentPokemonId,
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
  let gradientColors = typeColorGradient(types);
  let gradientColor1 = gradientColors[0];
  let gradientColor2 = gradientColors[1];
  let currentPokemonID = useCurrentPokemonId();
  let changeId = useUpdateCurrentPokemonId();
  return (
    <div className={`pokemon-card `}>
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
          {types.map((type) => (
            <div className={`type ${type} `}>&nbsp;</div>
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
  );
};

export default PokemonCard;
