"use strict";
const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        as: "Doctor",
        onDelete: "CASCADE",
        foreignKey: {
          name: "doctor_id",
          allowNull: false,
        },
      });
      this.belongsTo(User, {
        as: "User",
        onDelete: "CASCADE",
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
      });
    }
  }
  appointment.init(
    {
      apt_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      doctor_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: "User",
          key: "doctor_id",
        },
      },
    },
    {
      sequelize,
      modelName: "appointment",
      underscored: true,
    }
  );
  return appointment;
};
