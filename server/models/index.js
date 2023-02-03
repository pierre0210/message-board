import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import user from "./user.js";
import comment from "./comment.js";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DBPATH,
  logging: false,
});

const models = {};
models.sequelize = sequelize;
models.user = user(sequelize);
models.comment = comment(sequelize);

export default models;
