const express = require('express');
const router = express.Router();
const routerProductos = require('./productos');
const routerUsuarios = require('./usuarios');
const routerMain = require('./main');

router.use('/', routerMain);
router.use('/productos', routerProductos);
router.use('/usuarios', routerUsuarios);

module.exports = router;