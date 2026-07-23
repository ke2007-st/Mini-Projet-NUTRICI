package ci.ufrmi.nutrici.presentation;

import ci.ufrmi.nutrici.donnees.Commande;
import ci.ufrmi.nutrici.metier.CommandeService;
import ci.ufrmi.nutrici.metier.PanierService;
import ci.ufrmi.nutrici.metier.dto.ArticlePanier;
import ci.ufrmi.nutrici.metier.dto.PaiementRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PanierController {

    private final PanierService panierService;
    private final CommandeService commandeService;

    public PanierController(PanierService panierService, CommandeService commandeService) {
        this.panierService = panierService;
        this.commandeService = commandeService;
    }

    @PostMapping("/panier/total")
    public Map<String, Float> total(@RequestBody List<ArticlePanier> articles) {
        return Map.of("total", panierService.calculerTotal(articles));
    }

    /** US2 : paiement Mobile Money simule -> Commande Payee. */
    @PostMapping("/commandes/payer")
    public Commande payer(@RequestBody PaiementRequest request) {
        return commandeService.payerParMobileMoney(request);
    }
}
