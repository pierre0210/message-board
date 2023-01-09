import { DataTypes } from "sequelize";

/**
 * user model
 * @param {import("sequelize").Sequelize} sequelize
 */
export default (sequelize) => {
  return sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
