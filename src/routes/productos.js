const express = require('express');
const router = express.Router();
const uploadFile=require('../data/multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/usuarios/authMiddleware');
const esAdmin = require('../middlewares/usuarios/esAdmin');
const esCliente = require('../middlewares/usuarios/esCliente');
const esVendedor = require('../middlewares/usuarios/esVendedor');
const esVendedorOAdmin = require('../middlewares/esVendedorOAdmin');
const createProductoValidation = require('../middlewares/productos/createProductoValidation');
const editProductoValidation = require('../middlewares/productos/editProductoValidation');


router.get('/', productController.index);
router.post('/search', productController.search);
router.get('/carrito',authMiddleware,esCliente, productController.carrito);//solo cliente
router.get('/lista',authMiddleware, esAdmin, productController.lista);//solo admin
router.get('/listaMisProductos',authMiddleware, esVendedorOAdmin, productController.listaPorUsuario); //solo vendedor y admin
//listar
router.get('/listaproductos',authMiddleware,esVendedor, productController.listado);
router.get('/categoria',productController.listaPorCat);
//crear
router.get('/create',authMiddleware,esVendedorOAdmin, productController.create);
router.post('/create',authMiddleware,esVendedorOAdmin, uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]),createProductoValidation,productController.save);
//detalles
router.get('/detalle/:id', productController.detalle);
//editar
router.get('/editar/:id',authMiddleware,esVendedorOAdmin, productController.editProducto);
router.put('/editar/:id',authMiddleware,esVendedorOAdmin,uploadFile.fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]),editProductoValidation, productController.update);

//eliminar
router.delete('/delete/:id',authMiddleware,esVendedorOAdmin,productController.delete);


module.exports = router;