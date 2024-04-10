const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/usuarios/authMiddleware');
const esCliente = require('../middlewares/usuarios/esCliente');
const validarStockAdd = require('../middlewares/carrito/validarStockAdd');
// const validarStockUpd = require('../middlewares/carrito/validarStockUpd');


router.get('/',authMiddleware,esCliente, cartController.carrito);
router.get('/cantidadItems',authMiddleware,esCliente, cartController.cantidadItems);

router.get('/agregarCarrito',authMiddleware,esCliente,validarStockAdd,cartController.agregarAlCarrito);
router.put('/actualizarCantidad/:id',authMiddleware,esCliente,cartController.actualizarCantidad);
router.delete('/eliminarDetalleCarrito',authMiddleware,esCliente, cartController.eliminarDetalleCarrito);


module.exports = router;