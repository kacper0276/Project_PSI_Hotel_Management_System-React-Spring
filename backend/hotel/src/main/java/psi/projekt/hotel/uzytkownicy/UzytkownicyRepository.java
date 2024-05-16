package psi.projekt.hotel.uzytkownicy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Uzytkownicy;

@Repository
public interface UzytkownicyRepository extends JpaRepository<Uzytkownicy, Integer> {
}
