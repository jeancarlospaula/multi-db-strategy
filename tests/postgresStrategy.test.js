const assert = require("assert");
const Postgres = require("../src/db/strategies/postgres");
const Context = require("../src/db/strategies/base/ContextStrategy");

const context = new Context(new Postgres());

const mock_heroi_cadastrar = {
  nome: "Gaviao Negro",
  poder: "Flexas",
};

const mock_heroi_atualizar = {
  nome: "Batman",
  poder: "Dinheiro",
};

describe("Postgres Strategy", function () {
  this.timeout(Infinity);

  before(async () => {
    await context.connect();
    await context.delete();
    await context.create(mock_heroi_atualizar);
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

  it("Listar", async () => {
    const [{ nome, poder }] = await context.read({
      nome: mock_heroi_cadastrar.nome,
    });

    assert.deepEqual({ nome, poder }, mock_heroi_cadastrar);
  });

  it("Atualizar", async () => {
    const [itemAtualizar] = await context.read({
      nome: mock_heroi_atualizar.nome,
    });

    const novoItem = {
      ...mock_heroi_atualizar,
      nome: "Mulher Maravilha",
    };

    const [, [result]] = await context.update(itemAtualizar.id, novoItem);

    assert.deepEqual(result.nome, novoItem.nome);
  });

  it("Remover", async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});
