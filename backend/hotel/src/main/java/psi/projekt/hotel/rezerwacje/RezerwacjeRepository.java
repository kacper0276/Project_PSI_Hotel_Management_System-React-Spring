package psi.projekt.hotel.rezerwacje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface RezerwacjeRepository extends JpaRepository<Rezerwacje, Integer> {
    Optional<Rezerwacje> findById(Integer id);

    List<Rezerwacje> findByDataZameldowaniaBeforeAndDataWymeldowaniaAfter(Date data1, Date data2);

    List<Rezerwacje> findByKlient_Id(Integer id);
}
