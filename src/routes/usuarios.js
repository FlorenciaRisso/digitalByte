const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')
const registerValidation = require('../middlewares/registerValidation')
const multer = require('multer');
const uploadFile = require('../data/multer');

router.get('/profile/:id', userController.profile);
router.get('/lista', userController.lista)

router.get('/login', userController.login);
router.post('/login', userController.processLogin);

router.get('/registro', userController.registro);
router.post('/registro', uploadFile.single('image'), registerValidation, userController.processRegister)

router.get('/editar/:id', userController.edit)




module.exports = router;