const express = require('express');
const { searchCollections } = require('../controllers/searchController');
const router = express.Router();

router.get('/', searchCollections);

module.exports = router;
