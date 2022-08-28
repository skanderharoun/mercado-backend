const express = require('express');

const { getAllItems, getOneItem, createItem, updateItem, deleteItem } = require('../controllers/items');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getOneItem);
router.post('/', checkAuth, createItem);
router.put('/:id', checkAuth, updateItem);
router.delete('/:id', checkAuth, deleteItem);

module.exports = router;