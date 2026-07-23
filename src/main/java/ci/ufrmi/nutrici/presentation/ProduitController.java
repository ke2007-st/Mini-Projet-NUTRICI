package ci.ufrmi.nutrici.presentation;

import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.metier.ProduitAdminService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitAdminService produitAdminService;

    public ProduitController(ProduitAdminService produitAdminService) {
        this.produitAdminService = produitAdminService;
    }

    /** US1/US2 : liste des produits, filtrable par categorie. */
    @GetMapping
    public List<Produit> lister(@RequestParam(required = false) String categorie) {
        return produitAdminService.listerParCategorie(categorie);
    }
}
