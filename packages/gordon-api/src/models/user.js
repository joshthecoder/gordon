const arc = require("@architect/functions");
const bcrypt = require("bcryptjs");

module.exports = { getUserByEmail, createUser, verifyLogin };

async function getUserById(id) {
  const tables = await arc.tables();
  const result = await tables.users.query({
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id },
  });

  const [record] = result.Items;
  if (record) return { id: record.id, email: record.email };
  return null;
}

async function getUserByEmail(email) {
  return getUserById(`email#${email}`);
}

async function getUserPasswordByEmail(email) {
  const tables = await arc.tables();
  const result = await tables.passwords.query({
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": `email#${email}` },
  });

  const [record] = result.Items;

  if (record) return { hash: record.password };
  return null;
}

async function createUser({ email, password }) {
  const id = `email#${email}`;

  const hashPass = await bcrypt.hash(password, 10);
  const tables = await arc.tables();

  await tables.passwords.put({
    userId: id,
    password: hashPass,
  });

  await tables.users.put({
    id,
    email,
  });

  const user = await getUserByEmail(email);
  if (!user) throw new Error("Unexpected error creating user");

  return user;
}

async function verifyLogin({ email, password }) {
  const userPass = await getUserPasswordByEmail(email);

  if (!userPass) return undefined;

  const isValid = await bcrypt.compare(password, userPass.hash);
  if (!isValid) return undefined;

  return getUserByEmail(email);
}
