import { Sequelize } from "sequelize";
import pg from "pg";
const dbConfig = require("./config/config");
require("dotenv").config();

let sequelize;
if (process.env.CHECK_ENV === "production") {
  const env = process.env.CHECK_ENV || "production";
  const config = dbConfig[env];
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Use SSL
      },
    },
  });
} else {
  const env = process.env.CHECK_ENV || "development";
  const config = dbConfig[env];

  console.log("env", config);
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "postgres",
  });
}
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
