package psi.projekt.hotel.uzytkownicy;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Uzytkownicy;

@Service
public class UzytkownicyService {
    private final UzytkownicyRepository repository;

    public UzytkownicyService(UzytkownicyRepository repository) {
        this.repository = repository;
    }

    public void createUser(Uzytkownicy uzytkownicy) {


        repository.save(uzytkownicy);
    }
}
