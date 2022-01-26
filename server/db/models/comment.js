'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Incident}) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.belongsTo(Incident, {
        foreignKey: 'incidentId',
      });
    }
  };
  Comment.init({
    text: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
    },
    incidentId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: {
          tableName: 'Incidents',
        },
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
