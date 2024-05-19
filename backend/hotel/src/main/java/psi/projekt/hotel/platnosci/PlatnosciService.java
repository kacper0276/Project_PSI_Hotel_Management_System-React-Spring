package psi.projekt.hotel.platnosci;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Platnosci;

import java.util.List;
import java.util.Optional;

@Service
public class PlatnosciService {
    private final PlatnosciRepository repository;

    public PlatnosciService(PlatnosciRepository repository) {
        this.repository = repository;
    }

    List<Platnosci> getAllPayments() {
        return repository.findAll();
    }

    Optional<Platnosci> getPaymentById(Integer id) {
        return repository.findById(id);
    }

    void addPayment(Platnosci platnosc) {
        repository.save(platnosc);

        return;
    }
}
