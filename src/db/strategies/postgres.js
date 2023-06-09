require("dotenv").config();
const ICrud = require("./interfaces/interfaceCrud");

const { Sequelize } = require("sequelize");

const connection = {
  db: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const configs = {
  host: process.env.DB_HOST,
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorAliases: 0,
};

class PostgresDB extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
  }

  create(item) {
    console.log(`${item} salvo em PostgresDB`);
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("Erro ao conectar ao PostgresDB", error);
      return false;
    }
  }

  async defineModel() {
    this._herois = this._driver.define(
      "herois",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "TB_HEROIS",
        freezeTableName: false,
        timestamps: false,
      }
    );

    await this._herois.sync();
  }

  async connect() {
    this._driver = new Sequelize(
      connection.db,
      connection.username,
      connection.password,
      configs
    );

    await this.defineModel();
  }

  async create(item) {
    return this._herois.create(item);
  }

  async read(item = {}) {
    return this._herois.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return this._herois.update(item, {
      where: {
        id,
      },
      returning: true,
      raw: true,
    });
  }

  async delete(id) {
    const query = id ? { id } : {};

    return this._herois.destroy({ where: query });
  }
}

module.exports = PostgresDB;
