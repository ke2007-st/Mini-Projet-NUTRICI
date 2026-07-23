package ci.ufrmi.nutrici.metier;

import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.donnees.repo.ProduitRepository;
import ci.ufrmi.nutrici.metier.dto.ArticlePanier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PanierServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private PanierService panierService;

    private Produit vitamineC;

    @BeforeEach
    void setUp() {
        vitamineC = new Produit();
        vitamineC.setReference("VIT001");
        vitamineC.setNom("Vitamine C 1000mg");
        vitamineC.setPrixUnitaire(4500f);
        vitamineC.setQteStock(25);
    }

    @Test
    void calculerTotal_casNormal() {
        when(produitRepository.findById("VIT001")).thenReturn(Optional.of(vitamineC));

        float total = panierService.calculerTotal(List.of(new ArticlePanier("VIT001", 2)));

        assertEquals(9000f, total);
    }

    @Test
    void calculerTotal_panierVide_leveException() {
        MetierException ex = assertThrows(MetierException.class,
                () -> panierService.calculerTotal(List.of()));
        assertEquals("Le panier est vide.", ex.getMessage());
    }

    @Test
    void calculerTotal_quantiteNegative_leveException() {
        MetierException ex = assertThrows(MetierException.class,
                () -> panierService.calculerTotal(List.of(new ArticlePanier("VIT001", -1))));
        assertEquals(true, ex.getMessage().contains("Quantite invalide"));
    }

    @Test
    void validerArticles_quantiteSuperieureAuStock_leveException() {
        when(produitRepository.findById("VIT001")).thenReturn(Optional.of(vitamineC));

        MetierException ex = assertThrows(MetierException.class,
                () -> panierService.validerArticles(List.of(new ArticlePanier("VIT001", 30))));
        assertEquals(true, ex.getMessage().contains("Stock insuffisant"));
    }

    @Test
    void decrementerStock_reduitLaQuantite() {
        when(produitRepository.findById("VIT001")).thenReturn(Optional.of(vitamineC));
        when(produitRepository.save(vitamineC)).thenReturn(vitamineC);

        panierService.decrementerStock(List.of(new ArticlePanier("VIT001", 5)));

        assertEquals(20, vitamineC.getQteStock());
    }
}
