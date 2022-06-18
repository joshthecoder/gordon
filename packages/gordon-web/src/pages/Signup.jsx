import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { signup } from "@/api";

export default function Signup() {
  const navigate = useNavigate();
  const mutation = useMutation(signup, {
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

    if (!values.passwordConfirm) {
      errors.passwordConfirm = "Required";
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match must be same";
    }

    return errors;
  };

  const handleSubmit = ({ email, password }) => {
    mutation.mutate({ email, password });
  };

  return (
    <div className="mt-6 flex flex-col">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Create a new account
      </h2>
      <div className="flex min-h-full items-center  justify-center  py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Formik
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
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
              <div className="form-control w-full">
                <label htmlFor="passwordConfirm" className="label">
                  Confirm Password
                </label>
                <Field
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  className="input input-bordered"
                />
              </div>
              <div className="mt-6">
                <button type="submit" className="btn btn-primary btn-block">
                  Signup
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
