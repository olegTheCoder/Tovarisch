'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Comment, Incident, Radius }) {
			this.hasMany(Comment, { foreignKey: 'userId' })
			this.hasMany(Incident, { foreignKey: 'userId' })
			this.hasMany(Radius, { foreignKey: 'userId' })
		}
	}
	User.init(
		{
			nickname: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.TEXT,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)
	return User
}
