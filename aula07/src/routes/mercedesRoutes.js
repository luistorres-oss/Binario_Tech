const express = require('express');
const router = express.Router();

const mercedesController = require('../controllers/mercedesController');

router.get('/', mercedesController.listarFrota);
router.post('/', mercedesController.registrarCaminhao);

module.exports = router;
