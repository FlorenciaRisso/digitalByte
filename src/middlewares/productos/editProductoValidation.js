const {check} = require ('express-validator');
const path = require('path')

const editProductoValidation = [
    check('name').notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('description').notEmpty().withMessage('El campo descripcion no puede estar vacío'),
    check('category').notEmpty().withMessage('El campo categoria no puede estar vacío'),
    check('price').notEmpty().withMessage('El campo precio no puede estar vacío'),
    check('stock').notEmpty().withMessage('El campo stock no puede estar vacío'),
    check('image0').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg']
        if(file){
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    }),
    check('image1').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg']
        if(file){
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    }),
    check('image2').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg']
        if(file){
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    }),
    check('image3').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg']
        if(file){
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    }),
    

]
module.exports = editProductoValidation;