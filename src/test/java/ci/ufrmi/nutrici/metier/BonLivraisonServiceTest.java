package ci.ufrmi.nutrici.metier;

import ci.ufrmi.nutrici.donnees.Client;
import ci.ufrmi.nutrici.donnees.Commande;
import ci.ufrmi.nutrici.donnees.LigneCommande;
import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.donnees.repo.CommandeRepository;
import ci.ufrmi.nutrici.metier.dto.BonLivraison;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BonLivraisonServiceTest {

    @Mock
    private CommandeRepository commandeRepository;

    @Mock
    private CommandeService commandeService;

    @InjectMocks
    private BonLivraisonService bonLivraisonService;

    @Test
    void genererBonLivraison_contenuEtChangementStatut() {
        Client client = new Client("client@nutrici.ci", "Kouassi Yao", "0700000001", "Cocody");
        Produit produit = new Produit();
        produit.setReference("VIT001");
        produit.setNom("Vitamine C 1000mg");
        produit.setPrixUnitaire(4500f);

        Commande commande = new Commande();
        commande.setNumero("CMD-TEST01");
        commande.setDate(new Date());
        commande.setStatut(CommandeService.STATUT_PAYEE);
        commande.setClient(client);
        commande.ajouterLigne(new LigneCommande(2, 4500f, produit));

        when(commandeService.trouver("CMD-TEST01")).thenReturn(commande);
        when(commandeRepository.save(any(Commande.class))).thenReturn(commande);

        BonLivraison bon = bonLivraisonService.genererBonLivraison("CMD-TEST01");

        assertEquals("CMD-TEST01", bon.getNumeroCommande());
        assertEquals("Kouassi Yao", bon.getClientNom());
        assertEquals("Cocody", bon.getClientAdresse());
        assertEquals(1, bon.getLignes().size());
        assertEquals(9000f, bon.getTotal());
        assertEquals(CommandeService.STATUT_EN_LIVRAISON, bon.getStatut());
        assertEquals(CommandeService.STATUT_EN_LIVRAISON, commande.getStatut());
        verify(commandeRepository).save(commande);
    }

    @Test
    void genererBonLivraison_commandeNonPayee_leveException() {
        Commande commande = new Commande();
        commande.setNumero("CMD-X");
        commande.setStatut(CommandeService.STATUT_EN_LIVRAISON);
        when(commandeService.trouver("CMD-X")).thenReturn(commande);

        assertThrows(MetierException.class,
                () -> bonLivraisonService.genererBonLivraison("CMD-X"));
    }
}
