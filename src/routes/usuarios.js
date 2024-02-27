const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')
const registerValidation = require('../middlewares/registerValidation');
const multer = require('multer');
const uploadFile = require('../data/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const changePasswordValidation = require('../middlewares/changePasswordValidation')
const esAdmin = require('../middlewares/esAdmin');

router.get('/perfil/:id',authMiddleware, userController.profile);
router.get('/userProfile', authMiddleware, userController.userProfile)
router.get('/lista', esAdmin, userController.lista);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.processLogin);

router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro', uploadFile.single('avatar'),registerValidation, userController.processRegister)

router.get('/edit/:id', authMiddleware, userController.edit)
router.put('/edit/:id', uploadFile.single('avatar'), userController.update)

router.get('/cambiarContrasenia/:id', userController.cambiarContraseña)
router.put('/cambiarContrasenia/:id', changePasswordValidation,userController.updateContraseña)

router.get('/cerrarSesion',authMiddleware, userController.logout);

router.post('/eliminar/:id', esAdmin, userController.delete);

module.exports = router;