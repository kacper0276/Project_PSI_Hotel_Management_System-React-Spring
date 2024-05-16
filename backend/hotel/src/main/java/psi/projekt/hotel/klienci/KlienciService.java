package psi.projekt.hotel.klienci;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Klienci;

import java.util.List;
import java.util.Optional;

@Service
public class KlienciService {
    private final KlienciRepository repository;

    public KlienciService(KlienciRepository repository) {
        this.repository = repository;
    }

    public Klienci createClient() {
        return null;
    }

    public List<Klienci> getAllClients() {
        return repository.findAll();
    }

    public Optional<Klienci> getClientById(Integer id) {
        if (id < 1) {
            throw new RuntimeException();
        }

        return repository.findById(id);
    }
}
