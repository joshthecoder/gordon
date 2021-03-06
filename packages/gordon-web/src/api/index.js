import axios from "axios";

export async function getUser() {
  return axios.get("api/user");
}

export async function getRecipes() {
  return axios.get("/api/recipes");
}

export async function createRecipe(recipe) {
  return axios.post("/api/recipes", recipe);
}

export async function getUploadUrl(contentType) {
  return axios.get(
    `/api/upload-url?contentType=${encodeURIComponent(contentType)}`
  );
}

export async function uploadFile(file) {
  const signedUrlDetails = await getUploadUrl(file.type);
  const { url, fields } = signedUrlDetails.data;

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

export async function signup({ email, password }) {
  return axios.post("/api/user", { email, password });
}
