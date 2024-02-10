const {check} = require ('express-validator');
const path = require('path')

const editProductValidation = [
    check('password').notEmpty().withMessage('El campo contraseña no puede estar vacío'),
    check('confirmPassword').notEmpty().withMessage('Repite la contraseña'),
    check('country').notEmpty().withMessage('Debes seleccionar un país'),
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
module.exports = editProductValidation;