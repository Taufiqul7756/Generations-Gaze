const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: process.env.localhost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  port: process.env.dbPort,
  database: process.env.dbName,
});

module.exports = pool;
