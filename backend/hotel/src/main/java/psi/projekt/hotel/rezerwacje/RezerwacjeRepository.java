package psi.projekt.hotel.rezerwacje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Rezerwacje;

@Repository
public interface RezerwacjeRepository extends JpaRepository<Rezerwacje, Integer> {
}
