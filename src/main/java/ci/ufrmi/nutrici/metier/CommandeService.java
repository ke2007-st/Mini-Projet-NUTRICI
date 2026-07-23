package ci.ufrmi.nutrici.metier;

import ci.ufrmi.nutrici.donnees.Client;
import ci.ufrmi.nutrici.donnees.Commande;
import ci.ufrmi.nutrici.donnees.LigneCommande;
import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.donnees.repo.ClientRepository;
import ci.ufrmi.nutrici.donnees.repo.CommandeRepository;
import ci.ufrmi.nutrici.donnees.repo.ProduitRepository;
import ci.ufrmi.nutrici.metier.dto.ArticlePanier;
import ci.ufrmi.nutrici.metier.dto.PaiementRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class CommandeService {

    public static final String STATUT_PAYEE = "Payée";
    public static final String STATUT_EN_LIVRAISON = "En livraison";

    private final PanierService panierService;
    private final ClientRepository clientRepository;
    private final ProduitRepository produitRepository;
    private final CommandeRepository commandeRepository;

    public CommandeService(PanierService panierService,
                           ClientRepository clientRepository,
                           ProduitRepository produitRepository,
                           CommandeRepository commandeRepository) {
        this.panierService = panierService;
        this.clientRepository = clientRepository;
        this.produitRepository = produitRepository;
        this.commandeRepository = commandeRepository;
    }

    /**
     * US2 : paiement Mobile Money simule.
     * Cree une Commande statut "Payee", convertit le panier en LigneCommande, decremente le stock.
     */
    @Transactional
    public Commande payerParMobileMoney(PaiementRequest request) {
        if (request.getClientEmail() == null || request.getClientEmail().isBlank()) {
            throw new MetierException("Email client obligatoire.");
        }
        if (request.getOperateur() == null || request.getOperateur().isBlank()) {
            throw new MetierException("Operateur Mobile Money obligatoire (Wave / Orange Money).");
        }

        List<ArticlePanier> articles = request.getArticles();
        panierService.validerArticles(articles);

        Client client = clientRepository.findById(request.getClientEmail())
                .orElseThrow(() -> new MetierException(
                        "Client introuvable : " + request.getClientEmail()));

        Commande commande = new Commande();
        commande.setNumero("CMD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        commande.setDate(new Date());
        commande.setStatut(STATUT_PAYEE);
        commande.setClient(client);

        for (ArticlePanier article : articles) {
            Produit produit = produitRepository.findById(article.getReference()).orElseThrow();
            LigneCommande ligne = new LigneCommande(
                    article.getQuantite(),
                    produit.getPrixUnitaire(),
                    produit);
            commande.ajouterLigne(ligne);
        }

        panierService.decrementerStock(articles);
        return commandeRepository.save(commande);
    }

    public List<Commande> listerParStatut(String statut) {
        return commandeRepository.findByStatut(statut);
    }

    public Commande trouver(String numero) {
        return commandeRepository.findById(numero)
                .orElseThrow(() -> new MetierException("Commande introuvable : " + numero));
    }
}
