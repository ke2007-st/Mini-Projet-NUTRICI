const { construireBon } = require('../src/controllers/livraison.controller');

describe('Bon de livraison', () => {
  test('contenu du bon (client, lignes, total)', () => {
    const commande = {
      numero: 'CMD-TEST01',
      date: new Date('2026-07-24'),
      statut: 'Payée',
      Client: {
        nom: 'Kouassi Yao',
        email: 'client@nutrici.ci',
        telephone: '0700000001',
        adresse: 'Cocody'
      },
      lignes: [
        {
          quantite_commandee: 2,
          prix_facture: 4500,
          produit_reference: 'VIT001',
          Produit: { reference: 'VIT001', nom: 'Vitamine C 1000mg' }
        }
      ]
    };

    const bon = construireBon(commande);
    expect(bon.numeroCommande).toBe('CMD-TEST01');
    expect(bon.clientNom).toBe('Kouassi Yao');
    expect(bon.clientAdresse).toBe('Cocody');
    expect(bon.lignes).toHaveLength(1);
    expect(bon.total).toBe(9000);
  });
});
