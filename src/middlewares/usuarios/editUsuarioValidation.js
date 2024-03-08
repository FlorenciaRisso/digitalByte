const {check} = require ('express-validator');
const path = require('path')

const editUsuarioValidation = [
    check('firstName').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('lastName').notEmpty().withMessage('El campo apellid no puede estar vacío'),
    check('email').notEmpty().withMessage('El campo email no puede estar vacío'),
    check('country').notEmpty().withMessage('Debes seleccionar un país'),
    check('rol').notEmpty().withMessage('Debes elegir una categoría de usuario'),
    check('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg']
        if(!file){
            if(!req.body.oldImage){
                throw new Error('Tienes que subir una imagen');
            }else{
                return true
            }
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
    

]
module.exports = editUsuarioValidation;