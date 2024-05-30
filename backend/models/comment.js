const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./item');
const User = require('./user');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Item.hasMany(Comment, { foreignKey: 'itemId', as: 'comments' });
Comment.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = Comment;
