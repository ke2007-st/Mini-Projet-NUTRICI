package ci.ufrmi.nutrici.donnees.repo;

import ci.ufrmi.nutrici.donnees.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, String> {
}
