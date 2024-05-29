package psi.projekt.hotel.rezerwacje;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.Platnosci;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.Rezerwacje;
import psi.projekt.hotel.entity.projection.RezerwacjeDTO;
import psi.projekt.hotel.klienci.KlienciRepository;
import psi.projekt.hotel.platnosci.PlatnosciRepository;
import psi.projekt.hotel.pokoje.PokojeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RezerwacjeService {
    private final RezerwacjeRepository repository;
    private final RezerwacjeMapper mapper = RezerwacjeMapper.INSTANCE;
    private final PokojeRepository pokojeRepository;
    private final KlienciRepository klienciRepository;
    private final PlatnosciRepository platnosciRepository;

    public RezerwacjeService(RezerwacjeRepository repository, PokojeRepository pokojeRepository, KlienciRepository klienciRepository, PlatnosciRepository platnosciRepository) {
        this.repository = repository;
        this.pokojeRepository = pokojeRepository;
        this.klienciRepository = klienciRepository;
        this.platnosciRepository = platnosciRepository;
    }

    List<RezerwacjeDTO> getAllReservation() {
        return repository.findAll().stream()
                .map(mapper::rezerwacjeToRezerwacjeDTO)
                .toList();
    }

    Optional<RezerwacjeDTO> getReservationById(Integer id) {
        return repository.findById(id).map(mapper::rezerwacjeToRezerwacjeDTO);
    }

    void createReservation(RezerwacjeDTO rezerwacjaDTO) {
        Rezerwacje rezerwacja = mapper.rezerwacjeDTOToRezerwacje(rezerwacjaDTO);
        Pokoje pokoj = pokojeRepository.findById(rezerwacjaDTO.getPokoje_id()).orElse(null);
        Klienci klient = klienciRepository.findById(rezerwacjaDTO.getKlient_id()).orElse(null);

        if (pokoj == null || klient == null) {
            throw new RuntimeException("Nie ma takiego pokoju");
        }

        rezerwacja.setKlient(klient);
        rezerwacja.setPokoj(pokoj);

        repository.save(rezerwacja);
    }

    void payForRoom(Integer reservationId, Integer paymentId) {
        Platnosci platnosc = platnosciRepository.findById(paymentId).orElse(null);

        if (platnosc == null) {
            throw new RuntimeException("Nie ma takiej platnosci");
        }

        Rezerwacje rezerwacja = repository.findById(reservationId).orElse(null);

        if (rezerwacja == null) {
            throw new RuntimeException("Nie ma takiej rezerwacji");
        }

        rezerwacja.setPlatnosc(platnosc);

        repository.save(rezerwacja);
    }
}
