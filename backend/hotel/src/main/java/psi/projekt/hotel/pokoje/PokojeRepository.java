package psi.projekt.hotel.pokoje;

import org.springframework.data.jpa.repository.JpaRepository;
import psi.projekt.hotel.entity.Pokoje;

public interface PokojeRepository extends JpaRepository<Pokoje, Integer> {
}
