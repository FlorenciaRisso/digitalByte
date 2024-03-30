const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
});

const fileFilter = function (req, file, cb) {
    const acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (acceptedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`), false);
    }
};

const uploadFiles = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'image0', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);

const validateUpload = (req, res, next) => {
    uploadFiles(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return next(err);
        } else if (err) {
            return next(err);
        }

        // Validation using express-validator
        req.checkBody('image0').custom((value, { req }) => {
            if (!req.files['image0']) {
                throw new Error('Debe proporcionar una imagen para image0');
            }
            return true;
        });

        req.checkBody('image1').custom((value, { req }) => {
            if (!req.files['image1']) {
                throw new Error('Debe proporcionar una imagen para image1');
            }
            return true;
        });

        req.checkBody('image2').custom((value, { req }) => {
            if (!req.files['image2']) {
                throw new Error('Debe proporcionar una imagen para image2');
            }
            return true;
        });

        req.checkBody('image3').custom((value, { req }) => {
            if (!req.files['image3']) {
                throw new Error('Debe proporcionar una imagen para image3');
            }
            return true;
        });

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({ errors: errors });
        }
        
        next();
    });
};

module.exports = validateUpload;
