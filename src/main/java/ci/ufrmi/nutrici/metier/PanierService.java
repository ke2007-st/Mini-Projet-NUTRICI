package ci.ufrmi.nutrici.metier;

import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.donnees.repo.ProduitRepository;
import ci.ufrmi.nutrici.metier.dto.ArticlePanier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PanierService {

    private final ProduitRepository produitRepository;

    public PanierService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    /**
     * Calcule le total du panier.
     * Cas limites : panier vide, quantite nulle/negative, quantite > stock.
     */
    public float calculerTotal(List<ArticlePanier> articles) {
        validerArticles(articles);

        float total = 0f;
        for (ArticlePanier article : articles) {
            Produit produit = produitRepository.findById(article.getReference())
                    .orElseThrow(() -> new MetierException(
                            "Produit introuvable : " + article.getReference()));
            total += produit.getPrixUnitaire() * article.getQuantite();
        }
        return total;
    }

    public void validerArticles(List<ArticlePanier> articles) {
        if (articles == null || articles.isEmpty()) {
            throw new MetierException("Le panier est vide.");
        }

        for (ArticlePanier article : articles) {
            if (article.getQuantite() <= 0) {
                throw new MetierException(
                        "Quantite invalide pour " + article.getReference()
                                + " (doit etre > 0).");
            }

            Produit produit = produitRepository.findById(article.getReference())
                    .orElseThrow(() -> new MetierException(
                            "Produit introuvable : " + article.getReference()));

            if (article.getQuantite() > produit.getQteStock()) {
                throw new MetierException(
                        "Stock insuffisant pour " + produit.getNom()
                                + " (demande=" + article.getQuantite()
                                + ", stock=" + produit.getQteStock() + ").");
            }
        }
    }

    public void decrementerStock(List<ArticlePanier> articles) {
        for (ArticlePanier article : articles) {
            Produit produit = produitRepository.findById(article.getReference())
                    .orElseThrow(() -> new MetierException(
                            "Produit introuvable : " + article.getReference()));
            produit.setQteStock(produit.getQteStock() - article.getQuantite());
            produitRepository.save(produit);
        }
    }
}
