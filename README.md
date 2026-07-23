# NutriCI

Boutique de complements alimentaires — L2 MIAGE Genie Logiciel.

## Stack (binôme)

- Node.js + Express
- Sequelize + MySQL
- Front HTML/CSS/JS (`fetch`)
- Tests Jest (panier + bon de livraison)

## User stories

| US | Description | Fichiers |
|----|-------------|----------|
| US1 | Catalogue par categorie | `produit.controller.js`, `categorie.routes.js` |
| US2 | Panier + paiement Mobile Money | `panier.*`, `commande.controller.js` |
| US3 | CRUD admin produit / stock | `produit.controller.js` |
| US4 | Bon de livraison | `livraison.controller.js`, `admin.routes.js` |

## Configuration

1. Creer la base MySQL : `CREATE DATABASE nutrici;`
2. Copier `.env.example` vers `.env` et ajuster user/mot de passe
3. Installer et lancer :

```bash
npm install
npm start
```

- Boutique : http://localhost:3000/
- Admin produits : http://localhost:3000/admin-produits.html
- Admin livraison : http://localhost:3000/admin-livraison.html
- Client demo : `client@nutrici.ci`

## Tests

```bash
npm test
```
