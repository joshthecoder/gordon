import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Recipes from "./pages/Recipes";
import NewRecipe from "./pages/NewRecipe";
import Login from "./pages/Login";
import useGetUser from "./hooks/useGetUser";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="overflow-hidden font-sans antialiased">
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path="recipes"
                element={
                  <RequireAuth>
                    <Recipes />
                  </RequireAuth>
                }
              />
              <Route
                path="recipes/new"
                element={
                  <RequireAuth>
                    <NewRecipe />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    </div>
  );
}

function RequireAuth({ children }) {
  const location = useLocation();
  const { error, isLoading } = useGetUser();

  if (isLoading) return null;

  if (error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
