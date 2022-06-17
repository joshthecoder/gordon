const arc = require("@architect/functions");
const sandbox = require("@architect/sandbox");
const { getUserByEmail } = require("./user");

describe("user", () => {
  beforeEach(async () => {
    await sandbox.start();
  });

  describe("getUserByEmail", () => {
    it("should return null if user does not exist", async () => {
      expect(await getUserByEmail("nobody@test.com")).toBeNull();
    });
  });

  afterEach(async () => {
    await sandbox.end();
  });
});
