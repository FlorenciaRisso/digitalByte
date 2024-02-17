const {check} = require ('express-validator');
const path = require('path')

const registerValidation = [
    check('nombre').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('apellido').notEmpty().withMessage('El campo apellido no puede estar vacío'),
    check('email')
    .notEmpty().withMessage('El campo email no puede estar vacío').bail()
    .isEmail().withMessage('Debes ingresar un email válido').bail(),
    check('contraseña').notEmpty().withMessage('El campo contraseña no puede estar vacío'),
    check('confirmContraseña').notEmpty().withMessage('Repite la contraseña'),
    check('nacionalidad').notEmpty().withMessage('Debes seleccionar tu pais de nacimiento'),
    check('rol').notEmpty().withMessage('Debes elegir una categoría de usuario'),
    check('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
    

]
module.exports = registerValidation;