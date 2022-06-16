import { useQuery } from "react-query";

import { getRecipes } from "@/api";
import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  const query = useQuery("recipes", getRecipes);
  if (query.isLoading || query.isError) return null;
  return (
    <div className="flex gap-4">
      {query.data.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}
