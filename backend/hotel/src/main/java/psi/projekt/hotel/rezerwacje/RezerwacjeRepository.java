package psi.projekt.hotel.rezerwacje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Rezerwacje;

import java.util.List;
import java.util.Optional;

@Repository
public interface RezerwacjeRepository extends JpaRepository<Rezerwacje, Integer> {
    Optional<Rezerwacje> findById(Integer id);
}
