import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import RecipeList from "./components/RecipeList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <RecipeList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
