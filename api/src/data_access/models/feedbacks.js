"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedbacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Feedbacks.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      feedback: DataTypes.TEXT,
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
        },
      },
    },
    {
      sequelize,
      modelName: "Feedback",
      underscored: true,
    }
  );
  return Feedbacks;
};
