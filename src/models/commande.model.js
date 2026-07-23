// src/models/commande.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Client = require('./client.model');

const Commande = sequelize.define('Commande', {
  numero: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  statut: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: 'Payée'
  }
}, {
  tableName: 'commande',
  timestamps: false
});

Commande.belongsTo(Client, { foreignKey: 'client_email' });
Client.hasMany(Commande, { foreignKey: 'client_email' });

module.exports = Commande;
