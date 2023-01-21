import { DataTypes } from "sequelize";

/**
 * comment modal
 * @param {import("sequelize").Sequelize} sequelize
 */
export default (sequelize) => {
  return sequelize.define("comment", {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reply_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
