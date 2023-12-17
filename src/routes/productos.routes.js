const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer')

router.get('/', productController.index);

router.get('/crear', productController.altaProducto);
router.post('/crear', upload.single('imagen'), productController.store); 

router.get('/carrito', productController.carrito);
router.get('/listar', productController.listarProductos);


router.get('/detalle/:id', productController.detail);


//editar
router.get('/editar/:id', productController.edit);
router.put('/:id', productController.update);

//eliminar
router.delete('/delete/:id',productController.eliminarProducto);

//listar por categoria
router.get('/listar-por-categ/:id', productController.listarPorCategoria)

module.exports = router;