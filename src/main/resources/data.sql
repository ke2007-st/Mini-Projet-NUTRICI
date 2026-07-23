INSERT INTO categorie (code, libelle) VALUES
  ('ENERGIE', 'Energie'),
  ('SANTE', 'Sante'),
  ('MINCEUR', 'Regime minceur');

INSERT INTO produit (reference, nom, prix_unitaire, qte_stock, description, categorie_code) VALUES
  ('VIT001', 'Vitamine C 1000mg', 4500.00, 25, 'Renforce les defenses immunitaires', 'SANTE'),
  ('PRO002', 'Whey Proteine Vanille 1kg', 18500.00, 12, 'Apport proteique pour la recuperation', 'ENERGIE'),
  ('OME003', 'Omega 3 - 90 capsules', 8200.00, 3, 'Acides gras essentiels', 'SANTE'),
  ('CRE004', 'Creatine Monohydrate 300g', 12000.00, 8, 'Performance musculaire', 'ENERGIE'),
  ('BRU005', 'Bruleur de Graisse Thermo', 9800.00, 2, 'Aide a la perte de poids', 'MINCEUR'),
  ('ZIN006', 'Zinc + Magnesium 60 caps', 5500.00, 40, 'Equilibre mineral', 'SANTE');

INSERT INTO client (email, nom, telephone, adresse) VALUES
  ('client@nutrici.ci', 'Kouassi Yao', '0700000001', 'Cocody, Abidjan'),
  ('admin@nutrici.ci', 'Admin NutriCI', '0700000000', 'Siege NutriCI');
