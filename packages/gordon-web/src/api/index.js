import axios from "axios";

export async function getRecipes() {
  const response = await fetch("/api/recipes");
  if (!response.ok) {
    throw new Error("Error fetching recipes");
  }
  return response.json();
}

export async function createRecipe(recipe) {
  const response = await fetch("/api/recipes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    throw new Error("Error creating recipe");
  }
  return response.json();
}

export async function getUploadUrl(contentType) {
  const response = await fetch(
    `/api/upload-url?contentType=${encodeURIComponent(contentType)}`
  );
  if (!response.ok) {
    throw new Error("Error fetching upload url");
  }
  return response.json();
}

export async function uploadFile(file) {
  const signedUrlDetails = await getUploadUrl(file.type);
  const { url, fields } = signedUrlDetails;

  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });

  // Actual file has to be appended last.
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading file to S3");
  }

  return { url, key: fields.key };
}

export async function login({ email, password }) {
  return axios.post("/api/login", { email, password });
}
