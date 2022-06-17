export default function RecipeCard({ title, previewImage }) {
  // TODO: remove the joining of bucket host and image name
  // once cloudfront is deployed to serve static images.
  // API at that point should return full paths
  return (
    <a href={"#"} className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={`https://s3.amazonaws.com/gordon-uploads/${previewImage}`}
          // alt={product.imageAlt}
          className="h-48 w-96 object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
    </a>
  );
}
