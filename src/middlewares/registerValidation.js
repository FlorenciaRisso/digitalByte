const {check} = require ('express-validator');
const path = require('path')

const registerValidation = [
    check('firstName').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('lastName').notEmpty().withMessage('El campo apellido no puede estar vacío'),
    check('email')
    .notEmpty().withMessage('El campo email no puede estar vacío').bail()
    .isEmail().withMessage('Debes ingresar un email válido').bail(),
    check('password').notEmpty().withMessage('El campo contraseña no puede estar vacío'),
    check('confirmPassword').notEmpty().withMessage('Repite la contraseña'),
    check('country').notEmpty().withMessage('Debes seleccionar tu pais de nacimiento'),
    check('category').notEmpty().withMessage('Debes elegir una categoría de usuario'),
    check('image').custom((value, {req}) => {
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