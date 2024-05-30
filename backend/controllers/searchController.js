const Collection = require('../models/collection');
const Item = require('../models/item');
const { Op } = require('sequelize');

exports.searchCollections = async (req, res) => {
  const { query } = req.query;

  try {
    const collections = await Collection.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        {
          model: Item,
          as: 'items',
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${query}%` } },
              { tags: { [Op.like]: `%${query}%` } },
            ],
          },
          required: false,
        },
      ],
    });

    if (collections.length === 0) {
      return res.status(200).json({ message: 'No matching collections found' });
    }

    res.status(200).json(collections);
  } catch (error) {
    console.error('Error searching collections:', error.message);
    res.status(500).json({ error: error.message });
  }
};
