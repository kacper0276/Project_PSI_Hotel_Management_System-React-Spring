package psi.projekt.hotel.pokoje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Pokoje;

import java.util.List;
import java.util.Optional;

@Repository
public interface PokojeRepository extends JpaRepository<Pokoje, Integer> {
    List<Pokoje> findByDostepnoscIsTrue();
    Optional<Pokoje> findById(Integer id);
}
