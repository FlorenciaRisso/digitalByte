const { check } = require('express-validator');
const userService = require('../../data/userService');

const editUsuarioValidation = [
    check('firstName').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('lastName').notEmpty().withMessage('El campo apellid no puede estar vacío'),
    check('email').notEmpty().withMessage('El campo email no puede estar vacío').
        custom(async (value, { req }) => {
            const existingUser = await userService.getBy('email',value);
            if (existingUser && (existingUser.id != req.body.id)) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),
    check('country').notEmpty().withMessage('Debes seleccionar un país'),
    check('rol').notEmpty().withMessage('Debes elegir una categoría de usuario')
        .isIn(['Cliente', 'Vendedor', 'Administrador']).withMessage('El rol debe ser "Cliente", "Vendedor" o "Administrador"')
        .custom((value, { req }) => {
            if (req.session.usuarioLog && req.session.usuarioLog.rol !== 'Administrador' && value === 'Administrador') {
                throw new Error('Solo los administradores pueden elegir el rol "Administrador"');
            }
            return true;
        })
]
module.exports = editUsuarioValidation;