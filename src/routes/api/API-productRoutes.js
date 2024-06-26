const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/API-productController');

router.get('/', productController.list)
router.get('/latest', productController.latest)
router.get('/:id', productController.detail)


module.exports = router;