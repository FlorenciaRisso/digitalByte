const {check} = require ('express-validator');
const path = require('path')

const editProductoValidation = [
    check('name').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('description').notEmpty().withMessage('El campo descripcion no puede estar vacío'),
    check('category').notEmpty().withMessage('El campo categoria no puede estar vacío'),
    check('price').notEmpty().withMessage('El campo precio no puede estar vacío'),
    check('stock').notEmpty().withMessage('El campo stock no puede estar vacío')
    

]
module.exports = editProductoValidation;