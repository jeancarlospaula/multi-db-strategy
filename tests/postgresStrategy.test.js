const assert = require("assert");
const Postgres = require("../src/db/strategies/postgres");
const Context = require("../src/db/strategies/base/ContextStrategy");

const context = new Context(new Postgres());

describe("Postgres Strategy", () => {
  it("Postgres Connection", async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });
});
