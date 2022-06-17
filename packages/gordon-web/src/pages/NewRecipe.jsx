import { Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api";
import ImageUpload from "../components/ImageUpload";

export default function NewRecipe() {
  const navigate = useNavigate();

  const mutation = useMutation(createRecipe, {
    onSuccess() {
      navigate("/recipes");
    },
  });

  const handleSubmit = ({ title, image }) => {
    mutation.mutate({ title, previewImage: image.key });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 dark:border-gray-700 dark:bg-gray-900 dark:bg-gray-800 sm:p-6">
      <Formik initialValues={{ title: "" }} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <Field
              name="title"
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              for="default_size"
            >
              Preview Image
            </label>
            <Field name="image" component={ImageUpload} />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Create Recipe
          </button>
        </Form>
      </Formik>
    </div>
  );
}
