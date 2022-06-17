import { Field, Form, Formik } from "formik";

export default function Login() {
  const handleSubmit = (values) => {};

  return (
    <div className="flex min-h-full items-center  justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-control w-full">
              <label htmlFor="email" class="label">
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
          </Form>
        </Formik>
      </div>
    </div>
  );
}
