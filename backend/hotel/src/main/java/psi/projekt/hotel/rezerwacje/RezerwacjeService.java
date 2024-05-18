package psi.projekt.hotel.rezerwacje;

import org.springframework.stereotype.Service;

@Service
public class RezerwacjeService {
    private final RezerwacjeRepository repository;

    public RezerwacjeService(RezerwacjeRepository repository) {
        this.repository = repository;
    }
}
