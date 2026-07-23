// src/routes/commande.routes.js — US2

const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande.controller');

router.post('/payer', commandeController.payerMobileMoney);

module.exports = router;
