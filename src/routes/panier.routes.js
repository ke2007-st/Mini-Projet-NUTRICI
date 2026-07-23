// src/routes/panier.routes.js — US2

const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panier.controller');

router.post('/total', panierController.calculerTotal);

module.exports = router;
