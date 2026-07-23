// src/services/panier.service.js
// Règles métier US2 (testables sans Express)

function validerArticles(articles, produitsParRef) {
  if (!articles || articles.length === 0) {
    const err = new Error('Le panier est vide.');
    err.status = 400;
    throw err;
  }

  for (const article of articles) {
    if (!article.reference || article.quantite === undefined) {
      const err = new Error('Chaque article doit avoir reference et quantite.');
      err.status = 400;
      throw err;
    }
    if (article.quantite <= 0) {
      const err = new Error(`Quantite invalide pour ${article.reference} (doit etre > 0).`);
      err.status = 400;
      throw err;
    }

    const produit = produitsParRef[article.reference];
    if (!produit) {
      const err = new Error(`Produit introuvable : ${article.reference}`);
      err.status = 404;
      throw err;
    }

    const stock = Number(produit.qte_stock);
    if (article.quantite > stock) {
      const err = new Error(
        `Stock insuffisant pour ${produit.nom} (demande=${article.quantite}, stock=${stock}).`
      );
      err.status = 400;
      throw err;
    }
  }
}

function calculerTotal(articles, produitsParRef) {
  validerArticles(articles, produitsParRef);
  let total = 0;
  for (const article of articles) {
    const produit = produitsParRef[article.reference];
    total += Number(produit.prix_unitaire) * article.quantite;
  }
  return total;
}

module.exports = { validerArticles, calculerTotal };
