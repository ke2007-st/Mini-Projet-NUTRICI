package ci.ufrmi.nutrici.presentation;

import ci.ufrmi.nutrici.donnees.Categorie;
import ci.ufrmi.nutrici.metier.ProduitAdminService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** US1 : parcours du catalogue par categorie. */
@RestController
@RequestMapping("/api/categories")
public class CategorieController {

    private final ProduitAdminService produitAdminService;

    public CategorieController(ProduitAdminService produitAdminService) {
        this.produitAdminService = produitAdminService;
    }

    @GetMapping
    public List<Categorie> lister() {
        return produitAdminService.listerCategories();
    }
}
