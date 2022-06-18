const arc = require("@architect/functions");

const { requireAuth } = require("../middleware");

exports.handler = arc.http.async(requireAuth, handler);

async function handler(req) {
  let client = await arc.tables();
  let result = await client.recipes.scan();
  return { json: result.Items };
}
