package psi.projekt.hotel.platnosci;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Platnosci;
import psi.projekt.hotel.entity.projection.PlatnosciDTO;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlatnosciService {
    private final PlatnosciRepository repository;
    private final PlatnosciMapper mapper = PlatnosciMapper.INSTANCE;

    public PlatnosciService(PlatnosciRepository repository) {
        this.repository = repository;
    }

    List<PlatnosciDTO> getAllPayments() {
        List<Platnosci> platnosciList = repository.findAll();
        return platnosciList.stream()
                .map(PlatnosciMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    Optional<PlatnosciDTO> getPaymentById(Integer id) {
        Optional<Platnosci> platnosciOptional = repository.findById(id);
        return platnosciOptional.map(PlatnosciMapper.INSTANCE::toDto);
    }

    Platnosci addPayment(Platnosci platnosc) {
        platnosc.setDataPlatnosci(new Date());
        platnosc.setStatusPlatnosci("Zapłacone");
        return repository.save(platnosc);
    }
}
