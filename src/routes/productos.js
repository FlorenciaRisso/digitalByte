const express = require('express');
const path = require('path');
const router = express.Router();
const uploadFile=require('../data/multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const esAdmin = require('../middlewares/esAdmin')



router.get('/', productController.index);
router.post('/search', productController.search);
router.get('/carrito',authMiddleware, productController.carrito);
router.get('/lista', esAdmin, productController.lista); //solo admin
//listar
router.get('/listaproductos',authMiddleware, productController.listado);
router.get('/categoria',productController.listaPorCat);
//crear
router.get('/create', productController.create);
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
router.delete('/delete/:id',productController.delete);


module.exports = router;