const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/API-productController');

router.get('/', productController.list)


module.exports = router;