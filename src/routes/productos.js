const express = require('express');
const path = require('path');
const router = express.Router();
const uploadFile=require('../data/multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/', productController.index);
router.get('/carrito',authMiddleware, productController.carrito);
router.get('/lista', authMiddleware, productController.lista); //solo admin
//listar
router.get('/listaproductos',authMiddleware, productController.listado);
router.get('/categoria',productController.listaPorCat);
//crear
router.get('/create',authMiddleware, productController.create);
router.post('/create', uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]),productController.save);
//detalles
router.get('/detalle/:id', productController.detalle);
//editar
router.get('/editar/:id',authMiddleware, productController.editProducto);
router.put('/editar/:id',uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), productController.update);

//eliminar
router.delete('/delete/:id',productController.eliminarProducto);


module.exports = router;