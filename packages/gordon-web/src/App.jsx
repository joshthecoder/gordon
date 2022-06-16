import { useState } from "react";
import RecipeList from "./components/RecipeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <RecipeList />
    </div>
  );
}

export default App;
