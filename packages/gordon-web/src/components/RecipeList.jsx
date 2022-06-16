import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  return (
    <div className="flex gap-4">
      <RecipeCard />
      <RecipeCard />
    </div>
  );
}
