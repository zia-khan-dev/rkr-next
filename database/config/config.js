require("dotenv").config();


const dbConfig = {
  development: {
    username: process.env.DB_DEVELOPMENT_USER,
    password: process.env.DB_DEVELOPMENT_PASSWORD,
    database: process.env.DB_DEVELOPMENT_DATABASE,
    host: process.env.DB_DEVELOPMENT_HOST,
    dialect: process.env.DB_DEVELOPMENT_DIALECT,
  },

  test: {
    username: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.PRODUCTION_USER,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    dialect: process.env.DIALECT,
  },
};

module.exports = dbConfig;
