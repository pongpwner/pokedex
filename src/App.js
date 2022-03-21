import "./scss/_main.scss";

import { GlobalContextProvider } from "./contexts/global-contexts";

import PokemonDetails from "./pages/pokemon-details/pokemon-details.component";

import React from "react";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <PokemonDetails />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
