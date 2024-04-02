const { check } = require('express-validator');
const {Usuarios} = require('../../model/database/models');
const path = require('path');

const registerValidation = [
    check('nombre').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('apellido').notEmpty().withMessage('El campo apellido no puede estar vacío'),
    check('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        .custom(async (value,{req}) => {
            // Verificar si el email ya está registrado en la base de datos
            const existingUser = await Usuarios.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),
    check('password').notEmpty().withMessage('El campo contraseña no puede estar vacío')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*.,]).{8,}$/)
    .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial, y tener al menos 8 caracteres de longitud'),
    check('confirmPassword').notEmpty().withMessage('Repite la contraseña')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;  
    }),
    check('nacionalidad').notEmpty().withMessage('Debes seleccionar tu país de nacimiento'),
    check('rol').notEmpty().withMessage('Debes elegir una categoría de usuario')
];

module.exports = registerValidation;
