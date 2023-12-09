const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/Login', userController.login);
router.get('/Registro', userController.registro);
router.get('/:id', userController.getOne);

module.exports = router;