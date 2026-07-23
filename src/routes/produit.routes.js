// src/routes/produit.routes.js

const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produit.controller');

// Attention à l'ORDRE des routes : les routes fixes doivent passer AVANT les routes dynamiques (:reference)
router.get('/categorie/:categorieId', produitController.getProduitsByCategorie); // US1
router.get('/', produitController.getAllProduits);                              // US1
router.get('/:reference', produitController.getProduitByReference);
router.post('/', produitController.createProduit);                             // US3
router.put('/:reference', produitController.updateProduit);                    // US3
router.patch('/:reference/stock', produitController.updateStock);              // US3
router.delete('/:reference', produitController.deleteProduit);                 // US3

module.exports = router;