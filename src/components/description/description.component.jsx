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
      <h1 className="name">
        #{id} {name}
      </h1>
      <div className="types">
        {types &&
          types.map((type) => <div className={`type ${type}`}> {type}</div>)}
      </div>
      <div className="size">height:{height}</div>
      <div className="size">weight:{weight}</div>

      <div className="flavor-text">{description}</div>
    </div>
  );
};

export default Description;
