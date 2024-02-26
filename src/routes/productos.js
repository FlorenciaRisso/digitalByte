const express = require('express');
const path = require('path');
const router = express.Router();
const uploadFile=require('../data/multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const esAdmin = require('../middlewares/esAdmin');
const esCliente = require('../middlewares/esCliente');
const esVendedor = require('../middlewares/esVendedor');



router.get('/', productController.index);
router.post('/search', productController.search);
router.get('/carrito',authMiddleware,esCliente, productController.carrito);//solo cliente
router.get('/lista',authMiddleware, esAdmin, productController.lista); //solo admin
//listar
router.get('/listaproductos',authMiddleware,esVendedor, productController.listado);
router.get('/categoria',productController.listaPorCat);
//crear
router.get('/create',authMiddleware,esVendedor, productController.create);
router.post('/create',authMiddleware,esVendedor, uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]),productController.save);
//detalles
router.get('/detalle/:id', productController.detalle);
//editar
router.get('/editar/:id',authMiddleware,esVendedor, productController.editProducto);
router.put('/editar/:id',authMiddleware,esVendedor,uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), productController.update);

//eliminar
router.delete('/delete/:id',authMiddleware,esVendedor,productController.delete);


module.exports = router;