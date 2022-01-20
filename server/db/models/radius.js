"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Radius extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Radius.init(
    {
      title: {
        type: DataTypes.TEXT,
      },
      point: {
        type: DataTypes.TEXT,
      },
      radius: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Radius",
    }
  );
  return Radius;
};
