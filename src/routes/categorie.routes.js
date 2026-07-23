// src/routes/categorie.routes.js

const express = require('express');
const router = express.Router();
const { DataTypes } = require('sequelize');
const Categorie = require('../models/categorie.model');

// GET /api/categories — lister toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Erreur récupération catégories :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des catégories' });
  }
});

// POST /api/categories — créer une catégorie
router.post('/', async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom) {
      return res.status(400).json({ success: false, message: 'Le nom de la catégorie est obligatoire' });
    }
    const nouvelleCategorie = await Categorie.create({ nom });
    res.status(201).json({ success: true, data: nouvelleCategorie });
  } catch (error) {
    console.error('Erreur création catégorie :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création de la catégorie' });
  }
});

module.exports = router;