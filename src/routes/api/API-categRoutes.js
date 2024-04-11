const express = require('express');
const ApicategoriaController = require('../../controllers/api/API-categController');
const router = express.Router();

router.get('/list',ApicategoriaController.lista);
router.get('/detail/:id',ApicategoriaController.detail);

module.exports = router;