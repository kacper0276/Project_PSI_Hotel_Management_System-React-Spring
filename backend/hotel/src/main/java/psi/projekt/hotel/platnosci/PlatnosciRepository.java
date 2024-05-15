package psi.projekt.hotel.platnosci;

import org.springframework.data.jpa.repository.JpaRepository;
import psi.projekt.hotel.entity.Platnosci;

public interface PlatnosciRepository extends JpaRepository<Platnosci, Integer> {
}
