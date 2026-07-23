// src/models/client.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
  email: {
    type: DataTypes.STRING(120),
    primaryKey: true,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  adresse: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'client',
  timestamps: false
});

module.exports = Client;
