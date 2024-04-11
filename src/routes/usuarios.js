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
const esUsuarioOAdmin = require ('../middlewares/esUsuarioOAdmin');
const editUsuarioValidation=require ('../middlewares/usuarios/editUsuarioValidation')



router.get('/perfil/:id',authMiddleware, userController.profile);
router.get('/userProfile', authMiddleware, userController.userProfile)
router.get('/lista', esAdmin, userController.lista);
router.get('/filtro', esAdmin, userController.filtro);

router.get('/login', guestMiddleware, userController.login);
router.post('/login', loginValidation, userController.processLogin);

router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro', uploadFile,registerValidation, userController.processRegister)

router.get('/edit/:id', authMiddleware,esUsuarioOAdmin, userController.edit)
router.put('/edit/:id', uploadFile,esUsuarioOAdmin, editUsuarioValidation, userController.update)

router.get('/cambiarContrasenia/:id',authMiddleware,esUsuarioOAdmin,userController.cambiarContraseña)
router.put('/cambiarContrasenia/:id',authMiddleware,esUsuarioOAdmin,changePasswordValidation,userController.updateContraseña)

router.post('/verificarEmail',userController.verificarEmail);

router.get('/cerrarSesion',authMiddleware, userController.logout);

router.put('/eliminar/:id', esUsuarioOAdmin, userController.deleteCuenta);
router.put('/activar/:id', esUsuarioOAdmin, userController.activarCuenta);

module.exports = router;