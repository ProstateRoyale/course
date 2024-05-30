const Collection = require('../models/collection');
const Item = require('../models/item');
const sequelize = require('../config/database');

exports.createCollection = async (req, res) => {
  const { name, description, category, image } = req.body;
  const userId = req.userId;

  try {
    const collection = await Collection.create({
      name,
      description,
      category,
      image,
      userId,
    });

    res.status(201).json(collection);
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      include: [
        {
          model: Item,
          as: 'items',
        },
      ],
    });
    res.status(200).json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error); 
    res.status(500).json({ error: error.message });
  }
};

exports.getCollectionById = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findByPk(id, {
      include: [
        {
          model: Item,
          as: 'items',
        },
      ],
    });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(collection);
  } catch (error) {
    console.error('Error fetching collection by ID:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateCollection = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, image } = req.body;

  try {
    const collection = await Collection.findByPk(id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    collection.name = name;
    collection.description = description;
    collection.category = category;
    collection.image = image;

    await collection.save();

    res.status(200).json(collection);
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCollection = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findByPk(id);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await collection.destroy();

    res.status(200).json({ message: 'Collection deleted' });
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentCollections = async (req, res) => {
  try {
    const recentCollections = await Collection.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Item,
          as: 'items',
        },
      ],
    });

    res.status(200).json(recentCollections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLargestCollections = async (req, res) => {
  try {
    const largestCollections = await Collection.findAll({
      limit: 5,
      attributes: {
        include: [
          [
            sequelize.literal('(SELECT COUNT(*) FROM Items WHERE Items.collectionId = Collection.id)'),
            'itemsCount'
          ]
        ]
      },
      order: [[sequelize.literal('itemsCount'), 'DESC']],
      include: [
        {
          model: Item,
          as: 'items',
        },
      ],
    });

    res.status(200).json(largestCollections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};