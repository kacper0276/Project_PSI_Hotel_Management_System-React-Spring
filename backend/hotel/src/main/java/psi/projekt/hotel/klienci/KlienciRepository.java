package psi.projekt.hotel.klienci;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.enumValue.RodzajKlienta;

import java.util.List;
import java.util.Optional;

@Repository
public interface KlienciRepository extends JpaRepository<Klienci, Integer> {
    Optional<Klienci> findById(Integer id);

    List<Klienci> findByRodzaj(RodzajKlienta rodzaj);

    Optional<Klienci> findByImieAndNazwisko(String imie, String nazwisko);

    Optional<Klienci> findByNip(String nip);

    Optional<Klienci> findByUzytkownikId(int uzytkownikId);
}
