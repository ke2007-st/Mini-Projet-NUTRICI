// src/models/categorie.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorie = sequelize.define('Categorie', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorie',
  timestamps: false
});

module.exports = Categorie;