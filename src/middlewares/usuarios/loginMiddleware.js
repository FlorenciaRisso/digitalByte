const { check } = require('express-validator');
const { Usuarios } = require('../../model/database/models'); // Suponiendo que tienes un modelo de usuario

const loginValidation = [
    check('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        .custom(async (value, { req }) => {
            // Verificar si el email existe en la base de datos
            const existingUser = await Usuarios.findOne({ where: { email: value } });
            if (!existingUser) {
                throw new Error('El email no está registrado');
            }
        }),
    check('contraseña').notEmpty().withMessage('El campo contraseña no puede estar vacío').bail()
        
];

module.exports = loginValidation;