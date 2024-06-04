package psi.projekt.hotel.rezerwacje;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.*;
import psi.projekt.hotel.entity.projection.RezerwacjeDTO;
import psi.projekt.hotel.entity.projection.UzytkownicyDTO;
import psi.projekt.hotel.exceptions.ObjectNotExistInDBException;
import psi.projekt.hotel.klienci.KlienciRepository;
import psi.projekt.hotel.platnosci.PlatnosciRepository;
import psi.projekt.hotel.pokoje.PokojeRepository;
import psi.projekt.hotel.uzytkownicy.UzytkownicyService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RezerwacjeService {
    private final RezerwacjeRepository repository;
    private final RezerwacjeMapper mapper = RezerwacjeMapper.INSTANCE;
    private final PokojeRepository pokojeRepository;
    private final KlienciRepository klienciRepository;
    private final PlatnosciRepository platnosciRepository;
    private final UzytkownicyService uzytkownicyService;

    public RezerwacjeService(RezerwacjeRepository repository, PokojeRepository pokojeRepository, KlienciRepository klienciRepository, PlatnosciRepository platnosciRepository, UzytkownicyService uzytkownicyService) {
        this.repository = repository;
        this.pokojeRepository = pokojeRepository;
        this.klienciRepository = klienciRepository;
        this.platnosciRepository = platnosciRepository;
        this.uzytkownicyService = uzytkownicyService;
    }

    List<RezerwacjeDTO> getAllReservation() {
        return repository.findAll().stream()
                .map(mapper::rezerwacjeToRezerwacjeDTO)
                .toList();
    }

    Optional<RezerwacjeDTO> getReservationById(Integer id) {
        return repository.findById(id).map(mapper::rezerwacjeToRezerwacjeDTO);
    }

    Rezerwacje createReservation(RezerwacjeDTO rezerwacjaDTO, String useremail) {
        Rezerwacje rezerwacja = mapper.rezerwacjeDTOToRezerwacje(rezerwacjaDTO);
        Pokoje pokoj = pokojeRepository.findById(rezerwacjaDTO.getPokoje_id()).orElse(null);
        Klienci klient = uzytkownicyService.getUserByEmail(useremail)
                .map(uzytkownik -> klienciRepository.findByUzytkownikId(uzytkownik.getId()).orElse(null))
                .orElse(null);

        if (pokoj == null || klient == null) {
            throw new ObjectNotExistInDBException("Nie ma takiego pokoju");
        }

        rezerwacja.setKlient(klient);
        rezerwacja.setPokoj(pokoj);
        rezerwacja.setDataRezerwacji(new Date());
        rezerwacja.setPlatnosc(null);

        return repository.save(rezerwacja);
    }

    void payForRoom(Integer reservationId, Integer paymentId) {
        Platnosci platnosc = platnosciRepository.findById(paymentId).orElse(null);

        if (platnosc == null) {
            throw new ObjectNotExistInDBException("Nie ma takiej platnosci");
        }

        Rezerwacje rezerwacja = repository.findById(reservationId).orElse(null);

        if (rezerwacja == null) {
            throw new ObjectNotExistInDBException("Nie ma takiej rezerwacji");
        }

        rezerwacja.setPlatnosc(platnosc);
        rezerwacja.setFormaZaplaty(platnosc.getMetodaPlatnosci());
        rezerwacja.setStatus("Zapłacone");

        repository.save(rezerwacja);
    }

    List<RezerwacjeDTO> getUserReservations(String email) {
        UzytkownicyDTO uzytkownik = uzytkownicyService.getUserByEmail(email).orElse(null);

        if (uzytkownik == null) {
            throw new ObjectNotExistInDBException("Nie ma takiego uzytkownika");
        }

        Klienci klient = klienciRepository.findByUzytkownikId(uzytkownik.getId()).orElse(null);

        if (klient == null) {
            throw new ObjectNotExistInDBException("Nie ma takiego klienta");
        }

        return repository.findByKlient_Id(klient.getId()).stream()
                .map(mapper::rezerwacjeToRezerwacjeDTO)
                .toList();
    }

    void deleteReservation(Integer id) {
        repository.deleteById(id);
    }
}
