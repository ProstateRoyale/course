const express = require('express');
const {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/:itemId', getComments);
router.get('/:id', getCommentById);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
