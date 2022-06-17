import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import NewRecipe from "./pages/NewRecipe";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="overflow-hidden bg-gray-200 font-sans antialiased">
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="recipes" element={<RecipeList />} />
              <Route path="recipes/new" element={<NewRecipe />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
