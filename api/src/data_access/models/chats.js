"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Inbox, User }) {
      this.belongsTo(User, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  Chats.init(
    {
      // message: DataTypes.TEXT,
      message: DataTypes.TEXT,
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
        },
      },
      inbox_id: {
        type: DataTypes.UUID,
        references: {
          model: "Inbox",
        },
      },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "Chats",
      underscored: true,
    }
  );
  return Chats;
};
