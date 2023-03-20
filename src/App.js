import "./scss/_main.scss";

import { GlobalContextProvider } from "./contexts/global-contexts";

import HomePage from "./pages/homepage/homepage.component";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <HomePage />
        </GlobalContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
