const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/usuarios/authMiddleware');
const esCliente = require('../middlewares/usuarios/esCliente');
const validarStock = require('../middlewares/carrito/validarStock');


router.get('/',authMiddleware,esCliente, cartController.carrito);
router.get('/cantidadItems',authMiddleware,esCliente, cartController.cantidadItems);

router.get('/agregarCarrito',authMiddleware,esCliente,validarStock,cartController.agregarAlCarrito);

router.put('/actualizarCantidad/:id',authMiddleware,esCliente, cartController.actualizarCantidad);
router.delete('/eliminarDetalleCarrito',authMiddleware,esCliente, cartController.eliminarDetalleCarrito);


module.exports = router;