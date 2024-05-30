const Comment = require('../models/comment');
const Item = require('../models/item');

exports.createComment = async (req, res) => {
  const { content, itemId } = req.body;
  const userId = req.userId;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const comment = await Comment.create({
      content,
      userId,
      itemId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { itemId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { itemId },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    comment.content = content;

    await comment.save();

    res.status(200).json({ message: 'Comment updated', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await comment.destroy();

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
