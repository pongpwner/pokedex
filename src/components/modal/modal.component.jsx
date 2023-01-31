import React from "react";
import ReactDOM from "react-dom";
import "./modal.styles.scss";

import { typeColorGradient } from "../pokemon-card/pokemon-card.utils";
const Modal = ({ children, isOpen, closeModal, currentPokemon }) => {
  if (!isOpen) {
    return null;
  }

  let gradientColors = typeColorGradient(
    currentPokemon ? currentPokemon.types : ["normal", "normal"]
  );
  let gradientColor1 = gradientColors[0];
  let gradientColor2 = gradientColors[1];
  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={closeModal}></div>
      <div
        className="modal"
        style={{
          background: `linear-gradient(${gradientColor1},${gradientColor2})`,
        }}
      >
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};
export default Modal;
