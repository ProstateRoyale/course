const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Collection = sequelize.define('Collection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.ENUM('Books', 'Signs', 'Silverware', 'Other'),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasMany(Collection, { foreignKey: 'userId', as: 'collections' });
Collection.belongsTo(User, { foreignKey: 'userId' });

module.exports = Collection;
