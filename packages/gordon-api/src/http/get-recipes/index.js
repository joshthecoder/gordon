let path = require("path");
let arc = require("@architect/functions");

exports.handler = arc.http.async(handler);

async function handler(req) {
  let client = await arc.tables();
  let result = await client.recipes.scan();
  return {
    json: result.Items.map((item) => ({
      ...item,
      previewImage: path.join(
        process.env.PUBLIC_BUCKET_HTTP,
        item.previewImage
      ),
    })),
  };
}
