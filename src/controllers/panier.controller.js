// src/controllers/panier.controller.js — US2

const Produit = require('../models/produit.model');
const { calculerTotal } = require('../services/panier.service');

async function chargerProduits(articles) {
  const refs = [...new Set((articles || []).map(a => a.reference).filter(Boolean))];
  const produits = await Produit.findAll({ where: { reference: refs } });
  const map = {};
  for (const p of produits) {
    map[p.reference] = p;
  }
  return map;
}

// POST /api/panier/total
exports.calculerTotal = async (req, res) => {
  try {
    const articles = req.body;
    const produitsParRef = await chargerProduits(articles);
    const total = calculerTotal(articles, produitsParRef);
    res.status(200).json({ success: true, data: { total } });
  } catch (error) {
    console.error('Erreur calculerTotal :', error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Erreur lors du calcul du total'
    });
  }
};
