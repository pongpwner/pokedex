import "./description.styles.scss";

import React from "react";

const Description = ({
  name,
  types,
  height,
  weight,
  imgUrl,
  stats,
  abilities,
  description,
  id,
}) => {
  return (
    <div className="description">
      <h1 className="name heading 1">
        #{id} {name}
      </h1>
      <div className="types">
        {types &&
          types.map((type) => <div className={`type ${type}`}> {type}</div>)}
      </div>
      <div className="size">height: {height}cm</div>
      <div className="size">weight: {weight / 10}kg</div>

      <div className="flavor-text">{description}</div>
      {stats && (
        <div className="stats">
          <h2 className="heading2">Stats</h2>
          {stats.map((stat) => (
            <div className="stat">
              {stat.name}: {stat.baseStat}
            </div>
          ))}
        </div>
      )}
      {abilities && (
        <div className="abilities ">
          <h2 className="heading2">Abilities</h2>
          {abilities.map((ability) => (
            <div className="ability">{ability}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Description;
