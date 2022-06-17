let { v4: uuid } = require("uuid");
let arc = require("@architect/functions");

exports.handler = arc.http.async(handler);

async function handler(req) {
  let client = await arc.tables();
  let { title, previewImage } = req.body;
  let recipe = await client.recipes.put({
    id: uuid(),
    title,
    previewImage, // odo: should validate this is in format <uuid>.<allowed_format>
  });

  return { json: { recipe } };
}
