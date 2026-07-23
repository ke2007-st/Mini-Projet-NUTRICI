// src/config/seed.js — données de démo NutriCI

const Categorie = require('../models/categorie.model');
const Produit = require('../models/produit.model');
const Client = require('../models/client.model');

async function seedSiVide() {
  const nbCat = await Categorie.count();
  if (nbCat > 0) {
    return;
  }

  const energie = await Categorie.create({ nom: 'Energie' });
  const sante = await Categorie.create({ nom: 'Sante' });
  const minceur = await Categorie.create({ nom: 'Regime minceur' });

  await Produit.bulkCreate([
    { reference: 'VIT001', nom: 'Vitamine C 1000mg', prix_unitaire: 4500, qte_stock: 25, categorie_id: sante.id },
    { reference: 'PRO002', nom: 'Whey Proteine Vanille 1kg', prix_unitaire: 18500, qte_stock: 12, categorie_id: energie.id },
    { reference: 'OME003', nom: 'Omega 3 - 90 capsules', prix_unitaire: 8200, qte_stock: 3, categorie_id: sante.id },
    { reference: 'CRE004', nom: 'Creatine Monohydrate 300g', prix_unitaire: 12000, qte_stock: 8, categorie_id: energie.id },
    { reference: 'BRU005', nom: 'Bruleur de Graisse Thermo', prix_unitaire: 9800, qte_stock: 2, categorie_id: minceur.id },
    { reference: 'ZIN006', nom: 'Zinc + Magnesium 60 caps', prix_unitaire: 5500, qte_stock: 40, categorie_id: sante.id }
  ]);

  await Client.bulkCreate([
    {
      email: 'client@nutrici.ci',
      nom: 'Kouassi Yao',
      telephone: '0700000001',
      adresse: 'Cocody, Abidjan'
    },
    {
      email: 'admin@nutrici.ci',
      nom: 'Admin NutriCI',
      telephone: '0700000000',
      adresse: 'Siege NutriCI'
    }
  ]);

  console.log('Donnees de demo inserées.');
}

module.exports = seedSiVide;
