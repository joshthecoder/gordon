export default function RecipeCard({ title }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
}
