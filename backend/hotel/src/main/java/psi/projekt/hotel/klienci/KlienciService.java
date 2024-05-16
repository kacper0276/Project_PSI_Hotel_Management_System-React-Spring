package psi.projekt.hotel.klienci;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.enumValue.RodzajKlienta;
import psi.projekt.hotel.entity.projection.KlienciPrywatniReadModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KlienciService {
    private final KlienciRepository repository;
    private final KlienciMapper klienciMapper = KlienciMapper.INSTANCE;

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

    public List<KlienciPrywatniReadModel> getPrivateClients() {
        List<KlienciPrywatniReadModel> listClientsPrivate = new ArrayList<>();

        repository.findByRodzaj(RodzajKlienta.KlientIndywidualny).forEach(client -> {
            listClientsPrivate.add(klienciMapper.klienciToKlienciPrywatniRead(client));
        });

        return listClientsPrivate;
    }
}
