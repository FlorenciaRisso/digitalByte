const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/usuarios/authMiddleware');
const esCliente = require('../middlewares/usuarios/esCliente');


router.get('/',authMiddleware,esCliente, cartController.carrito);

router.get('/agregarCarrito',authMiddleware,esCliente, cartController.agregarAlCarrito);
router.put('/actualizarCantidad/:id',authMiddleware,esCliente, cartController.actualizarCantidad);


module.exports = router;