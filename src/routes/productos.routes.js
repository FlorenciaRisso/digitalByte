const express = require('express');
const path = require('path');
const router = express.Router();
const uploadFile=require('../data/multer');
const productController = require('../controllers/productController')

router.get('/', productController.index);
router.get('/carrito', productController.carrito);
router.get('/listar', productController.listarProductos); //solo admin
//listar
router.get('/categoria',productController.listarProductosPorCat);
//crear
router.get('/create', productController.altaProducto);
router.post('/create', uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]),productController.save);
//detalles
router.get('/detalle/:id', productController.detalle);
//editar
router.get('/editar/:id', productController.editProducto);
router.put('/editar/:id',uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), productController.update);

//eliminar
router.delete('/delete/:id',productController.eliminarProducto);


module.exports = router;