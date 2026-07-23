// src/controllers/commande.controller.js — US2 paiement Mobile Money

const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/db');
const Produit = require('../models/produit.model');
const Client = require('../models/client.model');
const Commande = require('../models/commande.model');
const LigneCommande = require('../models/ligneCommande.model');
const { validerArticles } = require('../services/panier.service');

async function chargerProduits(articles) {
  const refs = [...new Set((articles || []).map(a => a.reference).filter(Boolean))];
  const produits = await Produit.findAll({ where: { reference: refs } });
  const map = {};
  for (const p of produits) {
    map[p.reference] = p;
  }
  return map;
}

// POST /api/commandes/payer
exports.payerMobileMoney = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { clientEmail, operateur, articles } = req.body;

    if (!clientEmail) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'Email client obligatoire.' });
    }
    if (!operateur) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Operateur Mobile Money obligatoire (Wave / Orange Money).'
      });
    }

    const client = await Client.findByPk(clientEmail);
    if (!client) {
      await t.rollback();
      return res.status(404).json({ success: false, message: `Client introuvable : ${clientEmail}` });
    }

    const produitsParRef = await chargerProduits(articles);
    validerArticles(articles, produitsParRef);

    const numero = 'CMD-' + uuidv4().substring(0, 8).toUpperCase();
    const commande = await Commande.create({
      numero,
      date: new Date(),
      statut: 'Payée',
      client_email: clientEmail
    }, { transaction: t });

    for (const article of articles) {
      const produit = produitsParRef[article.reference];
      await LigneCommande.create({
        commande_numero: numero,
        produit_reference: produit.reference,
        quantite_commandee: article.quantite,
        prix_facture: produit.prix_unitaire
      }, { transaction: t });

      produit.qte_stock = Number(produit.qte_stock) - article.quantite;
      await produit.save({ transaction: t });
    }

    await t.commit();

    const complete = await Commande.findByPk(numero, {
      include: [
        { model: Client },
        { model: LigneCommande, as: 'lignes', include: [Produit] }
      ]
    });

    res.status(201).json({
      success: true,
      message: `Paiement ${operateur} simule avec succes`,
      data: complete
    });
  } catch (error) {
    await t.rollback();
    console.error('Erreur payerMobileMoney :', error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Erreur lors du paiement'
    });
  }
};

// GET /api/admin/commandes/payees
exports.listerPayees = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      where: { statut: 'Payée' },
      include: [
        { model: Client },
        { model: LigneCommande, as: 'lignes', include: [Produit] }
      ]
    });
    res.status(200).json({ success: true, data: commandes });
  } catch (error) {
    console.error('Erreur listerPayees :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la recuperation des commandes' });
  }
};
