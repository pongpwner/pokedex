import React from "react";
import "./evolution-chain.styles.scss";

const EvolutionChain = ({ evolutionChain }) => {
  if (!evolutionChain) {
    return null;
  }

  let stage1 = (
    <div className="stage1-container">
      <div className="stage1 seperate1">
        <div className="stage1 sprite ">
          <img src={evolutionChain.sprite} alt="pokemon" />
        </div>
        <div className="down-arrow">&#8595;</div>

        <div className="stage2-container">
          {evolutionChain.evolvesTo.length > 0
            ? evolutionChain.evolvesTo.map((pokemon) => {
                return (
                  <div className="stage2 seperate2" key={pokemon.name}>
                    <div className="stage2 sprite">
                      <img src={pokemon.sprite} alt="pokemon" />
                    </div>
                    {pokemon.evolvesTo.length > 0 ? (
                      <div className="down-arrow">&#8595;</div>
                    ) : null}
                    <div className="stage3-container">
                      {pokemon.evolvesTo.length > 0
                        ? pokemon.evolvesTo.map((pokemon) => {
                            //console.log(pokemon);
                            return (
                              <div
                                className="stage3 seperate3"
                                key={pokemon.name}
                              >
                                <div className="stage3 sprite">
                                  <img src={pokemon.sprite} alt="pokemon" />
                                </div>
                                <div
                                  className="stage4-container"
                                  key={pokemon.name}
                                >
                                  {pokemon.evolvesTo
                                    ? pokemon.evolvesTo.map((pokemon) => (
                                        <div className="sprite stage4">
                                          <img
                                            src={pokemon.sprite}
                                            alt="pokemon"
                                          />
                                        </div>
                                      ))
                                    : null}
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );

  return (
    <div className="evolution-chain">
      <div className="stage1">{stage1}</div>
    </div>
  );
};
export default EvolutionChain;
