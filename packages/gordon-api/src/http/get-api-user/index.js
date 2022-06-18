const arc = require("@architect/functions");

const { requireAuth } = require("../middleware");

exports.handler = arc.http.async(requireAuth, handler);

async function handler(req) {
  return { json: { user: req.session.user } };
}
