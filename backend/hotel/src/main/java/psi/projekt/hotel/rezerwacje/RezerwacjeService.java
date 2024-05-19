package psi.projekt.hotel.rezerwacje;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Rezerwacje;

import java.util.List;
import java.util.Optional;

@Service
public class RezerwacjeService {
    private final RezerwacjeRepository repository;

    public RezerwacjeService(RezerwacjeRepository repository) {
        this.repository = repository;
    }

    List<Rezerwacje> getAllReservation() {
        return repository.findAll();
    }

    Optional<Rezerwacje> getReservationById(Integer id) {
        return repository.findById(id);
    }

    void createReservation(Rezerwacje rezerwacja) {
        repository.save(rezerwacja);
    }
}
