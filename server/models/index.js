import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import user from "./user.js";
import comment from "./comment.js";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DBPATH,
  logging: false,
});

export default async () => {
  await user(sequelize).sync();
  await comment(sequelize).sync();

  return sequelize;
};
