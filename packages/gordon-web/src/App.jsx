import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipes from "./pages/Recipes";
import NewRecipe from "./pages/NewRecipe";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="overflow-hidden font-sans antialiased">
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/new" element={<NewRecipe />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
