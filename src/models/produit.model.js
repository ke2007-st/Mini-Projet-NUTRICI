// src/models/produit.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categorie = require('./categorie.model');

const Produit = sequelize.define('Produit', {
  reference: {
    type: DataTypes.STRING(6),
    primaryKey: true,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prix_unitaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  qte_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'produit',
  timestamps: false
});

Produit.belongsTo(Categorie, { foreignKey: 'categorie_id' });
Categorie.hasMany(Produit, { foreignKey: 'categorie_id' });

module.exports = Produit;