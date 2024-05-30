const Item = require('../models/item');
const Collection = require('../models/collection');

exports.createItem = async (req, res) => {
  const { name, tags, collectionId } = req.body;
  const userId = req.userId;

  try {
    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.userId !== userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const item = await Item.create({
      name,
      tags,
      collectionId,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, tags } = req.body;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const collection = await Collection.findByPk(item.collectionId);

    if (collection.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    item.name = name;
    item.tags = tags;

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const collection = await Collection.findByPk(item.collectionId);

    if (collection.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await item.destroy();

    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
