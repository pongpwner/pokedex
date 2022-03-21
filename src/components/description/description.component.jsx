import "./description.styles.scss";

import React from "react";
import {
  useCurrentPokemon,
  useCurrentPokemonId,
} from "../../contexts/global-contexts";
const Description = ({}) => {
  const currentPokemon = useCurrentPokemon();
  const currentPokemonID = useCurrentPokemonId();

  let name = currentPokemon.name;
  let height = currentPokemon.height;
  let weight = currentPokemon.weight;
  let description = currentPokemon.description;
  let types = currentPokemon.types;
  let id = currentPokemonID;
  let stats = currentPokemon.stats;
  let abilities = currentPokemon.abilities;
  return (
    <div className="description">
      <h1 className="name heading 1">
        #{id} {name}
      </h1>
      <div className="types">
        {types &&
          types.map((type, id) => (
            <div key={id} className={`type ${type}`}>
              {type}
            </div>
          ))}
      </div>
      <div className="size">height: {height}cm</div>
      <div className="size">weight: {weight / 10}kg</div>

      <div className="flavor-text">{description}</div>
      {stats && (
        <div className="stats">
          <h2 className="heading2">Stats</h2>
          {stats.map((stat, id) => (
            <div key={id} className="stat">
              {stat.name}: {stat.baseStat}
            </div>
          ))}
        </div>
      )}
      {abilities && (
        <div className="abilities ">
          <h2 className="heading2">Abilities</h2>
          {abilities.map((ability, id) => (
            <div key={id} className="ability">
              {ability}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Description;
