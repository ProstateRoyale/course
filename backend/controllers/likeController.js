const Like = require('../models/like');
const Item = require('../models/item');

exports.createLike = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const existingLike = await Like.findOne({ where: { itemId, userId } });

    if (existingLike) {
      return res.status(400).json({ message: 'Like already exists' });
    }

    const like = await Like.create({
      userId,
      itemId,
    });

    res.status(201).json({ message: 'Like created', like });
  } catch (error) {
    console.error('Error creating like:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLike = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;

  try {
    const like = await Like.findOne({ where: { itemId, userId } });

    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    await like.destroy();

    res.status(200).json({ message: 'Like deleted' });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getLikes = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.userId;

  try {
    const likesCount = await Like.count({ where: { itemId } });
    const userLiked = await Like.findOne({ where: { itemId, userId } });

    res.status(200).json({ count: likesCount, userLiked: !!userLiked });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getLikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const like = await Like.findByPk(id);

    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};