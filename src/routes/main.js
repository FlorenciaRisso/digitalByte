const express = require('express');
const path = require('path');
const router = express.Router();
const mainController = require('../controllers/mainController');
const valFormContacto = require('../middlewares/valFormContacto');

router.get('/', mainController.index);
router.get('/contacto', mainController.contactos);
router.post('/contacto',valFormContacto,mainController.formContacto);
router.get('/quienes-somos', mainController.quienesSomos);

module.exports = router;