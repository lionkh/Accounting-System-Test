const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/TransactionController');

router.get(`${TransactionController.prefix}`, TransactionController.index);
router.post(`${TransactionController.prefix}`, TransactionController.create);
router.get(`${TransactionController.prefix}/:id`, TransactionController.getById);
router.delete(`${TransactionController.prefix}/:id`, TransactionController.deleteById);

module.exports = router;