const express = require('express');
const router = express.Router();
const routerProductos = require('./productos.routes');
const routerUsuarios = require('./usuarios.routes');
const routerMain = require('./main.routes');

router.use('/productos', routerProductos);
router.use('/usuarios', routerUsuarios);
router.use('/', routerMain);

module.exports = router;