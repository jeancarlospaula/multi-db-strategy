const assert = require("assert");
const Postgres = require("../src/db/strategies/postgres");
const Context = require("../src/db/strategies/base/ContextStrategy");

const context = new Context(new Postgres());

const mock_heroi_cadastrar = {
  nome: "Gaviao Negro",
  poder: "Flexas",
};

describe("Postgres Strategy", function () {
  this.timeout(Infinity);

  before(async () => {
    await context.connect();
  });

  it("Postgres Connection", async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it("Cadastrar", async () => {
    const {
      dataValues: { nome, poder },
    } = await context.create(mock_heroi_cadastrar);

    assert.deepEqual({ nome, poder }, mock_heroi_cadastrar);
  });
});
