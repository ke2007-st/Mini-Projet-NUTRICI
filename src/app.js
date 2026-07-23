// src/app.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const produitRoutes = require('./routes/produit.routes');
const categorieRoutes = require('./routes/categorie.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ───
app.use(cors());          // autorise les requêtes venant d'un autre port/domaine (frontend)
app.use(express.json());  // permet de lire req.body en JSON

// ─── Route de test ───
app.get('/', (req, res) => {
  res.send('NutriCI API est en ligne !');
});

// ─── Branchement des routes ───
app.use('/api/produits', produitRoutes);
app.use('/api/categories', categorieRoutes);

// ─── Test de connexion à la base + démarrage du serveur ───
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à MySQL réussie !');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à MySQL :', err.message);
  });