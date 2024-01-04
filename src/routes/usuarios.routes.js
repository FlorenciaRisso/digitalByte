const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')
const registerValidation = require('../middlewares/registerValidation')
const multer = require('multer');
const uploadFile = require('../data/multer');

router.get('/:id');

router.get('/login', userController.login);


router.get('/registro', userController.registro);
router.post('/registro', uploadFile.single('image'), registerValidation, userController.processRegister)


module.exports = router;