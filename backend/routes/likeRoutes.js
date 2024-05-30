const express = require('express');
const {
  createLike,
  getLikes,
  deleteLike,
} = require('../controllers/likeController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createLike);
router.get('/:itemId', authMiddleware, getLikes);
router.delete('/', authMiddleware, deleteLike);

module.exports = router;

