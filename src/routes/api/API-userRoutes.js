const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/API-userController');

router.get('/', userController.list)
router.get('/:id', userController.detail)


module.exports = router;