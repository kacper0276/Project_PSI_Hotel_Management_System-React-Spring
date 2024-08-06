package psi.projekt.hotel.pokoje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PokojeRepository extends JpaRepository<Pokoje, Integer> {
    List<Pokoje> findByDostepnoscIsTrue();
    Optional<Pokoje> findById(Integer id);
    List<Pokoje> findByTypPokojuAndIleOsobGreaterThanEqual(String typPokoju, int ileOsob);
    @Query("SELECT p FROM Pokoje p WHERE p.typPokoju = :typPokoju AND p.ileOsob >= :ileOsob AND (p.dataZwolnienia < :dataZwolnienia OR (p.dataZwolnienia IS NULL AND p.dostepnosc = true))")
    List<Pokoje> findByTypPokojuAndIleOsobAndDataZwolnieniaOrDostepnosc(@Param("typPokoju") String typPokoju,
                                                                     @Param("ileOsob") int ileOsob,
                                                                     @Param("dataZwolnienia") Date dataZwolnienia);
}
