const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./item');
const User = require('./user');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: 'id',
    },
  },
});

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'userId' });

Item.hasMany(Like, { foreignKey: 'itemId', as: 'likes' });
Like.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = Like;
