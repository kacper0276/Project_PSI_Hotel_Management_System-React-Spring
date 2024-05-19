package psi.projekt.hotel.uzytkownicy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;

import java.util.List;
import java.util.Optional;

@Repository
public interface UzytkownicyRepository extends JpaRepository<Uzytkownicy, Integer> {
    Optional<Uzytkownicy> findById(Integer id);

    List<Uzytkownicy> findByRola(RolaUzytkownika rola);

    Optional<Uzytkownicy> findByEmail(String email);
}
