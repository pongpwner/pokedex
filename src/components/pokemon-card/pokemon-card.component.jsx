import React from "react";
import { Link } from "react-router-dom";
import "./pokemon-card.styles.scss";
import { typeColorGradient } from "./pokemon-card.utils";
import {
  useCurrentPokemonId,
  useUpdateCurrentPokemonId,
} from "../../contexts/global-contexts";
const PokemonCard = ({ name, types, id, sprites }) => {
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
            <div className={`type `}>{type}</div>
          ))}
        </div>
        <button type="button" onClick={() => changeId(id - currentPokemonID)}>
          <Link to="/"> More info</Link>
        </button>
      </div>
      <div
        style={{
          background: `linear-gradient(${gradientColor1},${gradientColor2})`,
        }}
        className="card-side card-side-back"
      >
        d
      </div>
    </div>
  );
};

export default PokemonCard;
