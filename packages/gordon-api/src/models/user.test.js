const arc = require("@architect/functions");
const sandbox = require("@architect/sandbox");
const { getUserByEmail, createUser } = require("./user");

describe("user", () => {
  beforeEach(async () => {
    await sandbox.start();
  });

  describe("getUserByEmail", () => {
    it("should return null if user does not exist", async () => {
      expect(await getUserByEmail("nobody@test.com")).toBeNull();
    });

    it("should find user by email if they exist", async () => {
      await createUser({ email: "johndoe@test.com", password: "pass" });
      expect(await getUserByEmail("johndoe@test.com")).toEqual({
        id: "email#johndoe@test.com",
        email: "johndoe@test.com",
      });
    });
  });

  afterEach(async () => {
    await sandbox.end();
  });
});
