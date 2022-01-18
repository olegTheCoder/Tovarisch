"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Incident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.hasMany(Comment, { foreignKey: "incidentId" });
    }
  }
  Incident.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      coords: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.TEXT,
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
      modelName: "Incident",
    }
  );
  return Incident;
};
