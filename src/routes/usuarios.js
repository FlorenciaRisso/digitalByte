const express = require('express');
const router = express.Router();
const uploadFile = require('../data/multer');
const userController = require('../controllers/userController')
const registerValidation = require('../middlewares/usuarios/registerValidation');
const guestMiddleware = require('../middlewares/usuarios/guestMiddleware');
const authMiddleware = require('../middlewares/usuarios/authMiddleware');
const changePasswordValidation = require('../middlewares/usuarios/changePasswordValidation');
const esAdmin = require('../middlewares/usuarios/esAdmin');
const loginValidation = require('../middlewares/usuarios/loginMiddleware');
const esUsuario = require ('../middlewares/esUsuario');
const editUsuarioValidation=require ('../middlewares/usuarios/editUsuarioValidation')


router.get('/perfil/:id',authMiddleware, userController.profile);
router.get('/userProfile', authMiddleware, userController.userProfile)
router.get('/lista', esAdmin, userController.lista);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', loginValidation, userController.processLogin);

router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro', uploadFile.single('avatar'),registerValidation, userController.processRegister)

router.get('/edit/:id', authMiddleware, userController.edit)
router.put('/edit/:id', uploadFile.single('avatar'),editUsuarioValidation, userController.update)

router.get('/cambiarContrasenia/:id', userController.cambiarContraseña)
router.put('/cambiarContrasenia/:id', changePasswordValidation,userController.updateContraseña)

router.get('/cerrarSesion',authMiddleware, userController.logout);

router.get('/eliminar/:id', esAdmin, userController.delete);
router.post('/eliminarCuenta/:id', esUsuario, userController.deleteCuenta);

module.exports = router;