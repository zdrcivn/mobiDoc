"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Chats }) {
      // define association here
      this.belongsTo(User, { as: "user1" });
      this.belongsTo(User, { as: "user2" });
      this.hasMany(Chats);
    }
  }
  Inbox.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Inbox",
      underscored: true,
    }
  );
  return Inbox;
};
