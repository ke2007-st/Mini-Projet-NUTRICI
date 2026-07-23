package ci.ufrmi.nutrici.presentation;

import ci.ufrmi.nutrici.donnees.Produit;
import ci.ufrmi.nutrici.metier.ProduitAdminService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** US3 : ajout / modification / suppression produit et stock. */
@RestController
@RequestMapping("/api/admin/produits")
public class AdminProduitController {

    private final ProduitAdminService produitAdminService;

    public AdminProduitController(ProduitAdminService produitAdminService) {
        this.produitAdminService = produitAdminService;
    }

    @PostMapping
    public Produit ajouter(@RequestBody Map<String, Object> body) {
        Produit p = mapProduit(body);
        String cat = String.valueOf(body.get("categorieCode"));
        return produitAdminService.ajouter(p, cat);
    }

    @PutMapping("/{reference}")
    public Produit modifier(@PathVariable String reference, @RequestBody Map<String, Object> body) {
        Produit p = mapProduit(body);
        String cat = body.get("categorieCode") != null
                ? String.valueOf(body.get("categorieCode")) : null;
        return produitAdminService.modifier(reference, p, cat);
    }

    @DeleteMapping("/{reference}")
    public Map<String, String> supprimer(@PathVariable String reference) {
        produitAdminService.supprimer(reference);
        return Map.of("message", "Produit supprime : " + reference);
    }

    private Produit mapProduit(Map<String, Object> body) {
        Produit p = new Produit();
        if (body.get("reference") != null) {
            p.setReference(String.valueOf(body.get("reference")));
        }
        if (body.get("nom") != null) {
            p.setNom(String.valueOf(body.get("nom")));
        }
        if (body.get("description") != null) {
            p.setDescription(String.valueOf(body.get("description")));
        }
        if (body.get("prixUnitaire") != null) {
            p.setPrixUnitaire(Float.parseFloat(String.valueOf(body.get("prixUnitaire"))));
        }
        if (body.get("qteStock") != null) {
            p.setQteStock(Integer.parseInt(String.valueOf(body.get("qteStock"))));
        }
        return p;
    }
}
