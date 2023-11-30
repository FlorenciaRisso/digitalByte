const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.index);
router.get('/Carrito', productController.carrito);
router.get('/Detalle', productController.detalle);
router.get('/:id', productController.getOne);

module.exports = router;