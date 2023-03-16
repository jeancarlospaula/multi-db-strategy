const MongoDB = require("./db/strategies/mongodb");
const PostgresDB = require("./db/strategies/postgres");
const ContextStrategy = require("./db/strategies/base/ContextStrategy");

const contextMongoDB = new ContextStrategy(new MongoDB());
contextMongoDB.create("Item 1");

const contextPostgresDB = new ContextStrategy(new PostgresDB());
contextPostgresDB.create("Item 2");
