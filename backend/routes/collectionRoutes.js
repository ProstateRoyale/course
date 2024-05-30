const express = require('express');
const {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getRecentCollections,
  getLargestCollections
} = require('../controllers/collectionController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createCollection);
router.get('/', getCollections);
router.get('/recent', getRecentCollections);
router.get('/largest', getLargestCollections);
router.get('/:id', getCollectionById);
router.put('/:id', authMiddleware, updateCollection);
router.delete('/:id', authMiddleware, deleteCollection);

module.exports = router;
