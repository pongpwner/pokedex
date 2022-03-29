import "./scss/_main.scss";

import { GlobalContextProvider } from "./contexts/global-contexts";

import ShowAll from "./pages/show-all/show-all.component";

import React from "react";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <ShowAll />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
