import { Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const mutation = useMutation(login, {
    onSuccess() {
      navigate("/recipes");
    },
  });

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const handleSubmit = ({ email, password }) => {
    mutation.mutate({ email, password });
  };

  return (
    <div className="mt-6 flex flex-col">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{" "}
        <a
          href="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          sign up for a free account
        </a>
      </p>
      <div className="flex min-h-full items-center  justify-center  py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-control w-full">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  autoFocus
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="input input-bordered"
                />
              </div>
              <div className="mt-6">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>

              {mutation.error && (
                <div className="mt-4 text-red-500">
                  {mutation.error?.response?.data?.error}
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
