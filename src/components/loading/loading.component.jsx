import React from "react";
import "./loading.styles.scss";
import pokeball from "../../assets/images/pokeball.gif";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-text">loading</div>
      <img className="loading-image" src={pokeball} alt="loading" />
    </div>
  );
};

export default Loading;
