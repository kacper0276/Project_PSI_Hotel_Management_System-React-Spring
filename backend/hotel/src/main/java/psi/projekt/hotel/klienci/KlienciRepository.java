package psi.projekt.hotel.klienci;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Klienci;

import java.util.Optional;

@Repository
public interface KlienciRepository extends JpaRepository<Klienci, Integer> {
    Optional<Klienci> findById(Integer id);
}
