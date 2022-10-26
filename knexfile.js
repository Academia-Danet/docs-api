const pg = require("pg");
require("dotenv").config()

pg.defaults.ssl = true;

const development = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DATABASE || "docs-api",
    user: process.env.DB_USER || "postgres",
    password: process.env.BD_PASSWORD || "root",
    port: process.env.DB_PORT || "5432",
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/database/migrations",
  },
};

const production = {};

module.exports = { development, production };
