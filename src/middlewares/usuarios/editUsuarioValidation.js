const {check} = require ('express-validator');
const path = require('path')

const editUsuarioValidation = [
    check('firstName').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('lastName').notEmpty().withMessage('El campo apellid no puede estar vacío'),
    check('email').notEmpty().withMessage('El campo email no puede estar vacío'),
    check('country').notEmpty().withMessage('Debes seleccionar un país'),
    check('rol').notEmpty().withMessage('Debes elegir una categoría de usuario')
]
module.exports = editUsuarioValidation;