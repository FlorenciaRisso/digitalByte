const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.index);

router.get('/:id', userController.getOne)

module.exports = router;