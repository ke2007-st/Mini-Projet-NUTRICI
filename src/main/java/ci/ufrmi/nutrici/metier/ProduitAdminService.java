package ci.ufrmi.nutrici.metier;

import ci.ufrmi.nutrici.donnees.Categorie;
import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.donnees.repo.CategorieRepository;
import ci.ufrmi.nutrici.donnees.repo.ProduitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * US1 (lecture catalogue / categories) + US3 (CRUD admin produit/stock).
 * Present pour coherence Spring du binome (branche Node conservee a part).
 */
@Service
public class ProduitAdminService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;

    public ProduitAdminService(ProduitRepository produitRepository,
                               CategorieRepository categorieRepository) {
        this.produitRepository = produitRepository;
        this.categorieRepository = categorieRepository;
    }

    public List<Categorie> listerCategories() {
        return categorieRepository.findAll();
    }

    public List<Produit> listerParCategorie(String codeCategorie) {
        if (codeCategorie == null || codeCategorie.isBlank()) {
            return produitRepository.findAll();
        }
        return produitRepository.findAll().stream()
                .filter(p -> p.getCategorie() != null
                        && codeCategorie.equalsIgnoreCase(p.getCategorie().getCode()))
                .toList();
    }

    @Transactional
    public Produit ajouter(Produit produit, String codeCategorie) {
        validerProduit(produit, true);
        Categorie cat = categorieRepository.findById(codeCategorie)
                .orElseThrow(() -> new MetierException("Categorie introuvable : " + codeCategorie));
        if (produitRepository.existsById(produit.getReference())) {
            throw new MetierException("Reference deja existante : " + produit.getReference());
        }
        produit.setCategorie(cat);
        return produitRepository.save(produit);
    }

    @Transactional
    public Produit modifier(String reference, Produit maj, String codeCategorie) {
        Produit existant = produitRepository.findById(reference)
                .orElseThrow(() -> new MetierException("Produit introuvable : " + reference));
        if (maj.getNom() != null) {
            existant.setNom(maj.getNom());
        }
        if (maj.getDescription() != null) {
            existant.setDescription(maj.getDescription());
        }
        if (maj.getPrixUnitaire() > 0) {
            existant.setPrixUnitaire(maj.getPrixUnitaire());
        }
        if (maj.getQteStock() >= 0) {
            existant.setQteStock(maj.getQteStock());
        }
        if (codeCategorie != null && !codeCategorie.isBlank()) {
            Categorie cat = categorieRepository.findById(codeCategorie)
                    .orElseThrow(() -> new MetierException("Categorie introuvable : " + codeCategorie));
            existant.setCategorie(cat);
        }
        validerProduit(existant, false);
        return produitRepository.save(existant);
    }

    @Transactional
    public void supprimer(String reference) {
        if (!produitRepository.existsById(reference)) {
            throw new MetierException("Produit introuvable : " + reference);
        }
        produitRepository.deleteById(reference);
    }

    private void validerProduit(Produit p, boolean creation) {
        if (creation && (p.getReference() == null || p.getReference().length() != 6)) {
            throw new MetierException("La reference doit faire 6 caracteres.");
        }
        if (p.getNom() == null || p.getNom().isBlank()) {
            throw new MetierException("Le nom est obligatoire.");
        }
        if (p.getPrixUnitaire() <= 0) {
            throw new MetierException("Le prix doit etre > 0.");
        }
        if (p.getQteStock() < 0) {
            throw new MetierException("Le stock ne peut pas etre negatif.");
        }
    }
}
