package psi.projekt.hotel.uzytkownicy;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;
import psi.projekt.hotel.entity.projection.UzytkownicyDTO;
import psi.projekt.hotel.exceptions.ObjectExistInDBException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UzytkownicyService {
    private final UzytkownicyRepository repository;
    private final UzytkownicyMapper mapper = UzytkownicyMapper.INSTANCE;

    public UzytkownicyService(UzytkownicyRepository repository) {
        this.repository = repository;
    }

    public void createUser(@Validated Uzytkownicy uzytkownicy) {
        repository.findByEmail(uzytkownicy.getEmail()).ifPresent(value -> {
            throw new ObjectExistInDBException("Taki email już istnieje");
        });

        repository.save(uzytkownicy);
    }

    @Transactional
    public void changeUserPassword(@Validated Uzytkownicy uzytkownik, String haslo) {
        Uzytkownicy uzytkownikSzukaj = repository.findByEmail(uzytkownik.getEmail()).orElse(null);

        if (uzytkownikSzukaj != null) {
            uzytkownik.setHaslo(haslo);

            repository.save(uzytkownik);
            return;
        }
    }

    public Optional<UzytkownicyDTO> getUserById(Integer id) {
        Optional<Uzytkownicy> uzytkownikOptional = repository.findById(id);

        return uzytkownikOptional.map(mapper::uzytkownicyToUzytkownicyDTO);
    }

    public Optional<UzytkownicyDTO> getUserByEmail(String email) {
        Optional<Uzytkownicy> uzytkownicy = repository.findByEmail(email);

        return uzytkownicy.map(mapper::uzytkownicyToUzytkownicyDTO);
    }

    public List<UzytkownicyDTO> getUsersByRole(RolaUzytkownika rola) {
        List<UzytkownicyDTO> users = new ArrayList<>();

        repository.findByRola(rola).forEach(user -> {
            users.add(mapper.uzytkownicyToUzytkownicyDTO(user));
        });

        return users;
    }

    List<UzytkownicyDTO> getAllUsers() {
        List<Uzytkownicy> uzytkownicyList = repository.findAll();

        return uzytkownicyList.stream()
                .map(mapper::uzytkownicyToUzytkownicyDTO)
                .collect(Collectors.toList());
    }

    boolean loginUser(String email, String haslo) {
        Uzytkownicy uzytkownik = repository.findByEmailAndHaslo(email, haslo).orElse(null);

        return uzytkownik == null ? false : true;
    }
}
