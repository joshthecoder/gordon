const arc = require("@architect/functions");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();

const URL_EXPIRATION_SECONDS = 300;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/gif", "image/png"];

exports.handler = arc.http.async(handler);

async function handler(req) {
  const contentType = req.query.contentType;
  if (ALLOWED_FILE_TYPES.indexOf(contentType) === -1) {
    return { status: 422, json: { error: "Invalid file type" } };
  }

  const randomID = uuid();
  const key = `${randomID}.${contentType.split("/")[1]}`;

  const data = await createPresignedPost({ key, contentType });

  return {
    json: data,
  };
}

function createPresignedPost({ key, contentType }) {
  const params = {
    Expires: URL_EXPIRATION_SECONDS,
    Bucket: process.env.UPLOAD_BUCKET,
    Conditions: [
      ["content-length-range", 100, 10000000], // allow up to 10mb uploads
      ["eq", "$Content-Type", contentType],
      ["starts-with", "$key", key],
    ],
    Fields: {
      "Content-Type": contentType,
      acl: "public-read",
      key,
    },
  };

  return new Promise(async (resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
