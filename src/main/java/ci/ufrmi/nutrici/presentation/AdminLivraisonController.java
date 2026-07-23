package ci.ufrmi.nutrici.presentation;

import ci.ufrmi.nutrici.donnees.Commande;
import ci.ufrmi.nutrici.metier.BonLivraisonService;
import ci.ufrmi.nutrici.metier.CommandeService;
import ci.ufrmi.nutrici.metier.dto.BonLivraison;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminLivraisonController {

    private final CommandeService commandeService;
    private final BonLivraisonService bonLivraisonService;

    public AdminLivraisonController(CommandeService commandeService,
                                    BonLivraisonService bonLivraisonService) {
        this.commandeService = commandeService;
        this.bonLivraisonService = bonLivraisonService;
    }

    @GetMapping("/commandes/payees")
    public List<Commande> commandesPayees() {
        return commandeService.listerParStatut(CommandeService.STATUT_PAYEE);
    }

    /** US4 : genere le bon et passe la commande en "En livraison". */
    @PostMapping("/commandes/{numero}/bon-livraison")
    public BonLivraison genererBon(@PathVariable String numero) {
        return bonLivraisonService.genererBonLivraison(numero);
    }
}
