const { check } = require('express-validator');
const {Usuarios} = require('../model/database/models'); // Suponiendo que tienes un modelo de usuario
const path = require('path');

const registerValidation = [
    check('nombre').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('apellido').notEmpty().withMessage('El campo apellido no puede estar vacío'),
    check('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        .custom(async (value, { req }) => {
            // Verificar si el email ya está registrado en la base de datos
            const existingUser = await Usuarios.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error('El email ya está registrado');
            }
        }),
    check('password').notEmpty().withMessage('El campo contraseña no puede estar vacío'),
    check('confirmPassword').notEmpty().withMessage('Repite la contraseña'),
    check('nacionalidad').notEmpty().withMessage('Debes seleccionar tu país de nacimiento'),
    check('rol').notEmpty().withMessage('Debes elegir una categoría de usuario'),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
];

module.exports = registerValidation;
