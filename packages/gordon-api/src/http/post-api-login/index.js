const arc = require("@architect/functions");

const { verifyLogin } = require("../../models/user");

exports.handler = arc.http.async(handler);

async function handler(req) {
  let { email, password } = req.body;
  let user = await verifyLogin({ email, password });
  if (!user) {
    return {
      status: 401,
      json: { error: "Email and/or password is incorrect" },
    };
  }
  return {
    session: { user },
  };
}
