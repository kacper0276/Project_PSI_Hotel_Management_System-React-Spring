package psi.projekt.hotel.klienci;

import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.enumValue.RodzajKlienta;
import psi.projekt.hotel.entity.projection.KlienciBiznesowi;
import psi.projekt.hotel.entity.projection.KlienciPrywatni;
import psi.projekt.hotel.exceptions.ObjectExistInDBException;

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

    public List<KlienciPrywatni> getPrivateClients() {
        List<KlienciPrywatni> listClientsPrivate = new ArrayList<>();

        repository.findByRodzaj(RodzajKlienta.KlientIndywidualny).forEach(client -> {
            listClientsPrivate.add(klienciMapper.klienciToKlienciPrywatni(client));
        });

        return listClientsPrivate;
    }

    public void createPrivateUser(KlienciPrywatni klientPrywatny) {
        Klienci klient = klienciMapper.klienciPrywatniToKlienci(klientPrywatny);

        repository.findByImieAndNazwisko(klientPrywatny.getImie(), klientPrywatny.getNazwisko()).ifPresent(value -> {
            throw new ObjectExistInDBException("Użytkownik istnieje!");
        });

        repository.save(klient);
    }

    public List<KlienciBiznesowi> getBusinessClients() {
        List<KlienciBiznesowi> businessClientsList = new ArrayList<>();

        repository.findByRodzaj(RodzajKlienta.KlientBizesowy).forEach(consumer -> {
            businessClientsList.add(klienciMapper.klienciToKlienciBiznesowi(consumer));
        });

        return businessClientsList;
    }

    public void createBusinessClient(KlienciBiznesowi klientBiznesowy) {
        Klienci klient = klienciMapper.klienciBiznesowiToKlienci(klientBiznesowy);

        repository.findByNip(klientBiznesowy.getNip()).ifPresent(value -> {
            throw new ObjectExistInDBException("Użytkownik już zarejestrowany!");
        });

        repository.save(klient);
    }
}
