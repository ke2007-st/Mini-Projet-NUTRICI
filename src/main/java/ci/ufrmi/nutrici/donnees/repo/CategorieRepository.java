package ci.ufrmi.nutrici.donnees.repo;

import ci.ufrmi.nutrici.donnees.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, String> {
}
