const arc = require("@architect/functions");
const bcrypt = require("bcryptjs");

export async function getUserById(id) {
  const tables = await arc.tables();
  const result = await arc.tables.users.query({
    KeyConditionExpression: "id = :id",
    ExpressionAttributesValues: { ":id": id },
  });

  const [record] = result.Items;
  if (record) return { id: record.id, email: record.email };
  return null;
}

export async function getUserByEmail(email) {
  return getUserById(`email#${email}`);
}

export async function getUserPasswordByEmail(email) {
  const tables = await arc.tables();
  const result = await tables.passwords.query({
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributesValues: { ":userId": `email#${email}` },
  });

  const [record] = result.Items;

  if (record) return { hash: record.password };
  return null;
}

export async function createUser({ email, password }) {
  const id = `email#${email}`;

  const hassPass = await bcrypt.hash(password, 10);
  const tables = await arc.tables();

  await tables.passwords.put({
    userId: id,
    password: hashPass,
  });

  await tables.users.put({
    id,
    email,
  });

  return user;
}

export async function verifyLogin({ email, password }) {
  const userPass = await getUserPasswordByEmail(email);

  if (!userPass) return undefined;

  const isValid = await bcrypt.compare(password, userPass.hash);
  if (!isValid) return undefined;

  return getUserByEmail(email);
}
