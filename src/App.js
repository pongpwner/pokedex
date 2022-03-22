import "./scss/_main.scss";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/global-contexts";

import PokemonDetails from "./pages/pokemon-details/pokemon-details.component";
import ShowAll from "./pages/show-all/show-all.component";

import React from "react";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PokemonDetails />} />
            <Route path="/show-all" element={<ShowAll />} />
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
