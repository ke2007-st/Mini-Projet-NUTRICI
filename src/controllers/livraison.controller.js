// src/controllers/livraison.controller.js — US4 bon de livraison

const Client = require('../models/client.model');
const Commande = require('../models/commande.model');
const LigneCommande = require('../models/ligneCommande.model');
const Produit = require('../models/produit.model');

function construireBon(commande) {
  const client = commande.Client;
  const lignes = (commande.lignes || []).map(l => {
    const sousTotal = Number(l.prix_facture) * l.quantite_commandee;
    return {
      reference: l.Produit ? l.Produit.reference : l.produit_reference,
      nomProduit: l.Produit ? l.Produit.nom : '',
      quantite: l.quantite_commandee,
      prixFacture: Number(l.prix_facture),
      sousTotal
    };
  });
  const total = lignes.reduce((acc, l) => acc + l.sousTotal, 0);

  return {
    numeroCommande: commande.numero,
    dateCommande: commande.date,
    statut: commande.statut,
    clientNom: client ? client.nom : '',
    clientEmail: client ? client.email : '',
    clientTelephone: client ? client.telephone : '',
    clientAdresse: client ? client.adresse : '',
    lignes,
    total
  };
}

// POST /api/admin/commandes/:numero/bon-livraison
exports.genererBonLivraison = async (req, res) => {
  try {
    const commande = await Commande.findByPk(req.params.numero, {
      include: [
        { model: Client },
        { model: LigneCommande, as: 'lignes', include: [Produit] }
      ]
    });

    if (!commande) {
      return res.status(404).json({
        success: false,
        message: `Commande introuvable : ${req.params.numero}`
      });
    }

    if (commande.statut !== 'Payée') {
      return res.status(400).json({
        success: false,
        message: `Seul une commande 'Payée' peut recevoir un bon de livraison (statut actuel : ${commande.statut}).`
      });
    }

    commande.statut = 'En livraison';
    await commande.save();

    const bon = construireBon(commande);
    bon.statut = commande.statut;

    res.status(200).json({ success: true, data: bon });
  } catch (error) {
    console.error('Erreur genererBonLivraison :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la generation du bon' });
  }
};

exports.construireBon = construireBon;
