const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.index);
router.get('/carrito', productController.carrito);
router.get('/listar', productController.listarProductos);

router.get('/crear', productController.altaProducto);
router.get('/detalle/:id', productController.detalle);
//editar
router.get('/editar/:id', productController.editProducto);
router.put('/:id', productController.update);

//eliminar
router.delete('/delete/:id',productController.eliminarProducto);


module.exports = router;