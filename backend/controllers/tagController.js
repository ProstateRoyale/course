const Item = require('../models/item');
const { Op } = require('sequelize');

exports.getTags = async (req, res) => {
  try {
    const tags = await Item.findAll({
      attributes: ['tags'],
      group: ['tags'],
    });

    const uniqueTags = [...new Set(tags.map(tag => tag.tags).flat())];
    res.status(200).json(uniqueTags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
