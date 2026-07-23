const { calculerTotal, validerArticles } = require('../src/services/panier.service');

const produits = {
  VIT001: { reference: 'VIT001', nom: 'Vitamine C', prix_unitaire: 4500, qte_stock: 25 }
};

describe('PanierService', () => {
  test('calculerTotal cas normal', () => {
    expect(calculerTotal([{ reference: 'VIT001', quantite: 2 }], produits)).toBe(9000);
  });

  test('panier vide leve une erreur', () => {
    expect(() => calculerTotal([], produits)).toThrow('Le panier est vide.');
  });

  test('quantite negative leve une erreur', () => {
    expect(() => calculerTotal([{ reference: 'VIT001', quantite: -1 }], produits))
      .toThrow(/Quantite invalide/);
  });

  test('quantite > stock leve une erreur', () => {
    expect(() => validerArticles([{ reference: 'VIT001', quantite: 30 }], produits))
      .toThrow(/Stock insuffisant/);
  });
});
