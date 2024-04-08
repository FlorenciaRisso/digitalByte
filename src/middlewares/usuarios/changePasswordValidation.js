const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const { Usuarios } = require('../../model/database/models');

const changePasswordValidation = [
    check('contraseniaVieja').notEmpty().withMessage('El campo no puede estar vacío').bail()
        .custom(async (value, { req }) => {
            // Obtener el usuario de la base de datos
            const usuario = await Usuarios.findByPk(req.params.id);

            // Verificar si el usuario existe y si la contraseña anterior es correcta
            if (!usuario || !bcrypt.compareSync(value, usuario.contraseña)) {
                throw new Error('La contraseña actual es incorrecta');
            }
        }),
    check('contrasenia').notEmpty().withMessage('El campo no puede estar vacío').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*.,]).{8,}$/)
    .withMessage('La contraseña debe contener una mayúscula una minúscula, un número, un carácter especial, y tener al menos 8 caracteres de longitud'),
    check('confirmContrasenia')
        .notEmpty().withMessage('El campo confirmación de contraseña no puede estar vacío').bail()
        .custom((value, { req }) => {
            if (value !== req.body.contrasenia) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
];

module.exports = changePasswordValidation;
