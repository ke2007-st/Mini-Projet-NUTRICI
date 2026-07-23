// src/routes/admin.routes.js — US4 (+ listing commandes payees)

const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande.controller');
const livraisonController = require('../controllers/livraison.controller');

router.get('/commandes/payees', commandeController.listerPayees);
router.post('/commandes/:numero/bon-livraison', livraisonController.genererBonLivraison);

module.exports = router;
