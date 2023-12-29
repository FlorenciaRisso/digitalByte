const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadFile=require('../data/multer');

router.get('/login', userController.login);
router.get('/registro', userController.registro);
router.post('/',uploadFile.any('image'),userController.save)
router.get('/:id', userController.getOne);

module.exports = router;