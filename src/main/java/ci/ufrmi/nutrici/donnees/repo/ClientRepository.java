package ci.ufrmi.nutrici.donnees.repo;

import ci.ufrmi.nutrici.donnees.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
}
