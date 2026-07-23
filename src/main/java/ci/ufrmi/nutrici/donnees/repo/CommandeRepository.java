package ci.ufrmi.nutrici.donnees.repo;

import ci.ufrmi.nutrici.donnees.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, String> {

    List<Commande> findByStatut(String statut);
}
