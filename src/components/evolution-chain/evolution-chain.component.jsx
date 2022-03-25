import React from "react";
import "./evolution-chain.styles.scss";

const EvolutionChain = ({ evolutionChain }) => {
  if (!evolutionChain) {
    return null;
  }
  //   let stage1 = <div className="stage1">{evolutionChain.name}</div>;
  //   let stage = 2;
  //   if (evolutionChain.evolves_to.length > 0) {
  //     let st;
  //   }
  //   let finalRender;
  console.log(evolutionChain);
  let stage1 = (
    <div className="stage1-container">
      <div className="stage1 seperate1">
        <div className="stage1 name">
          {evolutionChain.name}
          <img src={evolutionChain.sprite} alt="pokemon" />
        </div>

        <div className="stage2-container">
          {evolutionChain.evolvesTo.length > 0
            ? evolutionChain.evolvesTo.map((pokemon) => {
                console.log(pokemon);
                return (
                  <div className="stage2 seperate-2">
                    <div className="stage2 name">
                      {pokemon.name}
                      <img src={pokemon.sprite} alt="pokemon" />
                    </div>

                    <div className="stage3-container">
                      {pokemon.evolvesTo.length > 0
                        ? pokemon.evolvesTo.map((pokemon) => {
                            console.log(pokemon);
                            return (
                              <div className="stage3 seperate-3">
                                <div className="stage3 name">
                                  {pokemon.name}
                                  <img src={pokemon.sprite} alt="pokemon" />
                                </div>
                                <div className="stage4-container">
                                  {pokemon.evolvesTo
                                    ? pokemon.evolvesTo.map((pokemon) => (
                                        <div>
                                          {pokemon.name}
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
