const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Collection = require('./collection');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
  collectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Collection,
      key: 'id',
    },
  },
});

Collection.hasMany(Item, { foreignKey: 'collectionId', as: 'items' });
Item.belongsTo(Collection, { foreignKey: 'collectionId' });

module.exports = Item;
