package ci.ufrmi.nutrici.metier;

import ci.ufrmi.nutrici.donnees.Client;
import ci.ufrmi.nutrici.donnees.Commande;
import ci.ufrmi.nutrici.donnees.LigneCommande;
import ci.ufrmi.nutrici.donnees.repo.CommandeRepository;
import ci.ufrmi.nutrici.metier.dto.BonLivraison;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BonLivraisonService {

    private final CommandeRepository commandeRepository;
    private final CommandeService commandeService;

    public BonLivraisonService(CommandeRepository commandeRepository,
                               CommandeService commandeService) {
        this.commandeRepository = commandeRepository;
        this.commandeService = commandeService;
    }

    /**
     * US4 : genere un bon de livraison pour une commande "Payee",
     * puis passe le statut a "En livraison".
     */
    @Transactional
    public BonLivraison genererBonLivraison(String numeroCommande) {
        Commande commande = commandeService.trouver(numeroCommande);

        if (!CommandeService.STATUT_PAYEE.equals(commande.getStatut())) {
            throw new MetierException(
                    "Seul une commande '" + CommandeService.STATUT_PAYEE
                            + "' peut recevoir un bon de livraison (statut actuel : "
                            + commande.getStatut() + ").");
        }

        BonLivraison bon = construireBon(commande);
        commande.setStatut(CommandeService.STATUT_EN_LIVRAISON);
        commandeRepository.save(commande);
        bon.setStatut(commande.getStatut());
        return bon;
    }

    public BonLivraison construireBon(Commande commande) {
        Client client = commande.getClient();
        BonLivraison bon = new BonLivraison();
        bon.setNumeroCommande(commande.getNumero());
        bon.setDateCommande(commande.getDate());
        bon.setStatut(commande.getStatut());
        bon.setClientNom(client.getNom());
        bon.setClientEmail(client.getEmail());
        bon.setClientTelephone(client.getTelephone());
        bon.setClientAdresse(client.getAdresse());

        float total = 0f;
        for (LigneCommande ligne : commande.getLignes()) {
            BonLivraison.LigneBon lb = new BonLivraison.LigneBon();
            lb.setReference(ligne.getProduit().getReference());
            lb.setNomProduit(ligne.getProduit().getNom());
            lb.setQuantite(ligne.getQuantiteCommandee());
            lb.setPrixFacture(ligne.getPrixFacture());
            float sousTotal = ligne.getPrixFacture() * ligne.getQuantiteCommandee();
            lb.setSousTotal(sousTotal);
            total += sousTotal;
            bon.getLignes().add(lb);
        }
        bon.setTotal(total);
        return bon;
    }
}
