import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import user from "./user.js";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DBPATH,
  logging: false,
});

export default async () => {
  await user(sequelize).sync();

  return sequelize;
};
