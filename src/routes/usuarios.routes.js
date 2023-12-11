const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/login', userController.login);
router.get('/registro', userController.registro);
router.get('/:id', userController.getOne);

module.exports = router;