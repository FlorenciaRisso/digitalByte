const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/carrito', productController.carrito);
router.get('/listar', productController.listarProductos);

/*LISTADO POR CATEGORIA*/
router.get('/categoria/:id',productController.listarProductosPorCat);

/*LISTADO*/
router.get('/', productController.index);

/*CREACIÓN*/
router.get('/crear', productController.altaProducto);
router.post('/crear', productController.store); 

/*DETALLE*/
router.get('/detalle/:id', productController.detalle);

/*EDICIÓN*/
router.get('/editar/:id', productController.edit);
router.put('/:id', productController.update);

/*DELETE*/
router.delete('/delete/:id',productController.eliminarProducto);

module.exports = router;