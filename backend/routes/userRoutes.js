const express = require('express');
const { getUsers, blockUser, unblockUser, deleteUser, makeAdmin, removeAdmin } = require('../controllers/userController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.put('/:id/block', authMiddleware, adminMiddleware, blockUser);
router.put('/:id/unblock', authMiddleware, adminMiddleware, unblockUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);
router.put('/:id/make-admin', authMiddleware, adminMiddleware, makeAdmin);
router.put('/:id/remove-admin', authMiddleware, adminMiddleware, removeAdmin);

module.exports = router;
