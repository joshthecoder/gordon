import { useQuery } from "react-query";

import { getRecipes } from "@/api";
import useAPI from "@/hooks/useAPI";
import RecipeCard from "@/components/RecipeCard";

export default function Recipes() {
  const { isLoading, isError, data } = useAPI("/api/recipes");
  if (isLoading || isError) return null;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-6 flex justify-between">
          <h2 className="text-3xl">Recipes</h2>
          <a
            href="/recipes/new"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Recipe
          </a>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
