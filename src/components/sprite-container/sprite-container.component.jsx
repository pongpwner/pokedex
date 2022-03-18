import React, { useState } from "react";
import "./sprite-container.styles.scss";

const SpriteContainer = ({ imageLinks }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSprite() {
    //moves current slide index +1
    if (currentSlide === imageLinks.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  }

  function prevSprite() {
    //moves current slide index -1
    if (currentSlide === 0) {
      setCurrentSlide(imageLinks.length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  }
  return (
    <div className="sprite-container">
      <div className="image-container">
        <button className="left" onClick={prevSprite}>
          &lt;
        </button>
        <button className="right" onClick={nextSprite}>
          &gt;
        </button>

        {imageLinks && (
          <img
            src={imageLinks[currentSlide]}
            alt="pokemon"
            className="pokemon-sprite"
          />
        )}
      </div>
    </div>
  );
};

export default SpriteContainer;
