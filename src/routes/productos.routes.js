const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.index);
router.get('/carrito', productController.carrito);
router.get('/:id', productController.getOne);

module.exports = router;