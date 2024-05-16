package psi.projekt.hotel.pokoje;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Pokoje;

import java.util.List;
import java.util.Optional;

@Service
public class PokojeService {
    private final PokojeRepository repository;

    public PokojeService(PokojeRepository repository) {
        this.repository = repository;
    }

    List<Pokoje> getEmptyRooms() {
        return repository.findByDostepnoscIsTrue();
    }

    List<Pokoje> getAllRooms() {
        return repository.findAll();
    }

    Optional<Pokoje> getRoomDetailsById(Integer id) {
        return repository.findById(id);
    }
}
