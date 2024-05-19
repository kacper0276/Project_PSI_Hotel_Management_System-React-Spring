package psi.projekt.hotel.uzytkownicy;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;
import psi.projekt.hotel.exceptions.ObjectExistInDBException;

import java.util.List;
import java.util.Optional;

@Service
public class UzytkownicyService {
    private final UzytkownicyRepository repository;

    public UzytkownicyService(UzytkownicyRepository repository) {
        this.repository = repository;
    }

    public void createUser(Uzytkownicy uzytkownicy) {
        repository.findByEmail(uzytkownicy.getEmail()).ifPresent(value -> {
            throw new ObjectExistInDBException("Taki email już istnieje");
        });

        repository.save(uzytkownicy);
    }

    @Transactional
    public void changeUserPassword(Uzytkownicy uzytkownik, String haslo) {
        Uzytkownicy uzytkownikSzukaj = repository.findByEmail(uzytkownik.getEmail()).orElse(null);

        if (uzytkownikSzukaj != null) {
            uzytkownik.setHaslo(haslo);

            repository.save(uzytkownik);
            return;
        }
    }

    public Optional<Uzytkownicy> getUserById(Integer id) {
        return repository.findById(id);
    }

    public Optional<Uzytkownicy> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public List<Uzytkownicy> getUsersByRole(RolaUzytkownika rola) {
        return repository.findByRola(rola);
    }
}
