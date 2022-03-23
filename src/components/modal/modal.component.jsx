import React from "react";
import ReactDOM from "react-dom";
import "./modal.styles.scss";

const Modal = ({ children, isOpen, closeModal }) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal">{children}</div>
    </>,
    document.getElementById("portal")
  );
};
export default Modal;
