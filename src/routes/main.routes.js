const express = require('express');
const path = require('path');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.index);
router.get('/contacto', mainController.contactos);
router.get('/quienes-somos', mainController.quienesSomos);

module.exports = router;