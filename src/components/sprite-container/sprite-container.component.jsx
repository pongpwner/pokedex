import React, { useState } from "react";
import "./sprite-container.styles.scss";
import { useCurrentPokemon } from "../../contexts/global-contexts";

const SpriteContainer = () => {
  const currentPokemon = useCurrentPokemon();
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageLinks = currentPokemon ? currentPokemon.sprites : ["/"];
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
  return currentPokemon ? (
    <div className="sprite-container">
      <div className="image-container">
        <button
          className="left"
          onClick={(e) => {
            prevSprite();
            e.stopPropagation();
          }}
        >
          &lt;
        </button>
        <button
          className="right"
          onClick={(e) => {
            nextSprite();
            e.stopPropagation();
          }}
        >
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
  ) : null;
};

export default SpriteContainer;
