// src/controllers/produit.controller.js

const Produit = require('../models/produit.model');
const Categorie = require('../models/categorie.model');

// GET /api/produits — US1 : lister tous les produits, avec leur catégorie
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.findAll({ include: Categorie });
    res.status(200).json({ success: true, data: produits });
  } catch (error) {
    console.error('Erreur getAllProduits :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des produits' });
  }
};

// GET /api/produits/categorie/:categorieId — US1 : filtrer par catégorie
exports.getProduitsByCategorie = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      where: { categorie_id: req.params.categorieId },
      include: Categorie
    });
    res.status(200).json({ success: true, data: produits });
  } catch (error) {
    console.error('Erreur getProduitsByCategorie :', error);
    res.status(500).json({ success: false, message: 'Erreur lors du filtrage par catégorie' });
  }
};

// GET /api/produits/:reference — récupérer un produit précis
exports.getProduitByReference = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.reference, { include: Categorie });
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }
    res.status(200).json({ success: true, data: produit });
  } catch (error) {
    console.error('Erreur getProduitByReference :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération du produit' });
  }
};

// POST /api/produits — US3 : l'admin ajoute un produit
exports.createProduit = async (req, res) => {
  try {
    const { reference, nom, prix_unitaire, qte_stock, categorie_id } = req.body;

    if (!reference || !nom || !prix_unitaire) {
      return res.status(400).json({
        success: false,
        message: 'Champs obligatoires manquants (reference, nom, prix_unitaire)'
      });
    }

    if (prix_unitaire <= 0) {
      return res.status(400).json({ success: false, message: 'Le prix doit être positif' });
    }

    const nouveauProduit = await Produit.create({
      reference, nom, prix_unitaire, qte_stock: qte_stock || 0, categorie_id
    });

    res.status(201).json({ success: true, data: nouveauProduit });
  } catch (error) {
    console.error('Erreur createProduit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création du produit' });
  }
};

// PUT /api/produits/:reference — US3 : l'admin modifie un produit
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.reference);
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }
    await produit.update(req.body);
    res.status(200).json({ success: true, data: produit });
  } catch (error) {
    console.error('Erreur updateProduit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la modification du produit' });
  }
};

// PATCH /api/produits/:reference/stock — US3 : ajuster le stock
exports.updateStock = async (req, res) => {
  try {
    const { qte_stock } = req.body;

    if (qte_stock === undefined || qte_stock < 0) {
      return res.status(400).json({ success: false, message: 'Quantité de stock invalide' });
    }

    const produit = await Produit.findByPk(req.params.reference);
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }

    produit.qte_stock = qte_stock;
    await produit.save();

    res.status(200).json({ success: true, data: produit });
  } catch (error) {
    console.error('Erreur updateStock :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du stock' });
  }
};

// DELETE /api/produits/:reference — US3 : l'admin supprime un produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.reference);
    if (!produit) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }
    await produit.destroy();
    res.status(200).json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteProduit :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du produit' });
  }
};