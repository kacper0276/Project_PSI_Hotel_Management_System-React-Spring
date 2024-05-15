package psi.projekt.hotel.klienci;

import org.springframework.data.jpa.repository.JpaRepository;
import psi.projekt.hotel.entity.Klienci;

public interface KlienciRepository extends JpaRepository<Klienci, Integer> {
}
