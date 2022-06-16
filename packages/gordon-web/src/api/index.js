export async function getRecipes() {
  const response = await fetch("/api/recipes");
  if (!response.ok) {
    throw new Error("Error fetching recipes");
  }
  return response.json();
}
