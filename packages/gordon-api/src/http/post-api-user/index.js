const arc = require("@architect/functions");

const { createUser, getUserByEmail } = require("../../models/user");

exports.handler = arc.http.async(handler);

async function handler(req) {
  const { email, password } = req.body;
  if (!email || !password) {
    return { status: 422, json: { error: "email and password are required" } };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      status: 422,
      json: { errors: "user with this email already exists" },
    };
  }

  const user = await createUser({ email, password });
  return {
    json: { user: { id: user.id } },
  };
}
