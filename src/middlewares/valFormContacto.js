const { check } = require('express-validator');
const path = require('path');
const {Interesado} = require('../model/database/models/Interesados')

const contactoValidation = [
    check('nombre').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('apellido').notEmpty().withMessage('El campo apellido no puede estar vacío'),
    check('email')
        .notEmpty().withMessage('El campo email no puede estar vacío').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail(),
    check('telefono').notEmpty().withMessage('Debes ingresar un numero de telefono')
];

module.exports = contactoValidation;
