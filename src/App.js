import "./scss/_main.scss";

import { GlobalContextProvider } from "./contexts/global-contexts";

import ShowAll from "./pages/show-all/show-all.component";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <ShowAll />
        </GlobalContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
