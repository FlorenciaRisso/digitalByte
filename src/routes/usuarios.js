const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')
const registerValidation = require('../middlewares/registerValidation');
const multer = require('multer');
const uploadFile = require('../data/multer');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/perfil/:id',authMiddleware, userController.profile);
router.get('/userProfile', authMiddleware , userController.userProfile)
router.get('/lista',authMiddleware, userController.lista);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.processLogin);

router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro', uploadFile.single('image'), registerValidation, userController.processRegister)

router.get('/edit/:id',authMiddleware, userController.edit)
router.put('/edit/:id', uploadFile.single('image'), userController.update)

router.get('/cerrarSesion',authMiddleware, userController.logout);

router.delete('/eliminar/:id',authMiddleware, userController.delete);




module.exports = router;