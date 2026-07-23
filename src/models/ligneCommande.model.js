// src/models/ligneCommande.model.js
// Classe d'association N:M entre Commande et Produit

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Commande = require('./commande.model');
const Produit = require('./produit.model');

const LigneCommande = sequelize.define('LigneCommande', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantite_commandee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prix_facture: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'ligne_commande',
  timestamps: false
});

LigneCommande.belongsTo(Commande, { foreignKey: 'commande_numero' });
Commande.hasMany(LigneCommande, { foreignKey: 'commande_numero', as: 'lignes' });

LigneCommande.belongsTo(Produit, { foreignKey: 'produit_reference' });
Produit.hasMany(LigneCommande, { foreignKey: 'produit_reference' });

module.exports = LigneCommande;
