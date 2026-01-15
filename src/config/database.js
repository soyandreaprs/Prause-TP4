import config from "./config.js";
import { Sequelize } from "sequelize";


export const database = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export const connection = async () => {
  try {
    await database.authenticate();
    await database.sync();
  } catch (error) {
    throw error;
  }
};
