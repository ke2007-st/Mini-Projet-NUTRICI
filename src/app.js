// src/app.js

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Charge les modèles et associations
require('./models/categorie.model');
require('./models/produit.model');
require('./models/client.model');
require('./models/commande.model');
require('./models/ligneCommande.model');

const produitRoutes = require('./routes/produit.routes');
const categorieRoutes = require('./routes/categorie.routes');
const panierRoutes = require('./routes/panier.routes');
const commandeRoutes = require('./routes/commande.routes');
const adminRoutes = require('./routes/admin.routes');
const seedSiVide = require('./config/seed');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ───
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ─── Branchement des routes API ───
app.use('/api/produits', produitRoutes);       // US1 + US3 (binôme)
app.use('/api/categories', categorieRoutes);   // US1 (binôme)
app.use('/api/panier', panierRoutes);          // US2
app.use('/api/commandes', commandeRoutes);     // US2
app.use('/api/admin', adminRoutes);            // US4

// ─── Connexion BDD + sync + démarrage ───
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à MySQL réussie !');
    return sequelize.sync();
  })
  .then(() => seedSiVide())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
      console.log(`Boutique : http://localhost:${PORT}/`);
      console.log(`Admin livraison : http://localhost:${PORT}/admin-livraison.html`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à MySQL :', err.message);
  });
