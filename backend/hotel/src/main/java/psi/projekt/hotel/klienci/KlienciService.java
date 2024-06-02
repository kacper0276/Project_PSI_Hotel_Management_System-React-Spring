package psi.projekt.hotel.klienci;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.enumValue.RodzajKlienta;
import psi.projekt.hotel.entity.projection.KlienciBiznesowi;
import psi.projekt.hotel.entity.projection.KlienciBiznesowiDTO;
import psi.projekt.hotel.entity.projection.KlienciPrywatni;
import psi.projekt.hotel.entity.projection.KlienciPrywatniDTO;
import psi.projekt.hotel.exceptions.ObjectExistInDBException;
import psi.projekt.hotel.exceptions.ObjectNotExistInDBException;
import psi.projekt.hotel.uzytkownicy.UzytkownicyRepository;
import psi.projekt.hotel.uzytkownicy.UzytkownicyService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KlienciService {
    private final KlienciRepository repository;
    private final UzytkownicyRepository uzytkownicyRepository;
    private final KlienciMapper klienciMapper = KlienciMapper.INSTANCE;

    public KlienciService(KlienciRepository repository, UzytkownicyRepository uzytkownicyRepository) {
        this.repository = repository;
        this.uzytkownicyRepository = uzytkownicyRepository;
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

    public List<KlienciPrywatniDTO> getPrivateClients() {
        List<KlienciPrywatniDTO> listClientsPrivate = new ArrayList<>();

        repository.findByRodzaj(RodzajKlienta.KlientIndywidualny).forEach(client -> {
            listClientsPrivate.add(klienciMapper.klienciToKlienciPrywatniDTO(client));
        });

        return listClientsPrivate;
    }

    public void createPrivateUser(@Validated KlienciPrywatni klientPrywatny) {
        System.out.println(klientPrywatny.getImie());
        System.out.println(klientPrywatny.getUzytkownik().getEmail());

        Klienci klient = klienciMapper.klienciPrywatniToKlienci(klientPrywatny);
        Uzytkownicy uzytownik = uzytkownicyRepository.findByEmail(klient.getUzytkownik().getEmail()).orElse(null);

        if(uzytownik == null) {
            throw new ObjectExistInDBException("Nie ma takiego użytkownika");
        }

        repository.findByImieAndNazwisko(klientPrywatny.getImie(), klientPrywatny.getNazwisko()).ifPresent(value -> {
            throw new ObjectExistInDBException("Użytkownik istnieje!");
        });

        klient.setUzytkownik(uzytownik);

        repository.save(klient);
    }

    public List<KlienciBiznesowiDTO> getBusinessClients() {
        List<KlienciBiznesowiDTO> businessClientsList = new ArrayList<>();

        repository.findByRodzaj(RodzajKlienta.KlientBizesowy).forEach(consumer -> {
            businessClientsList.add(klienciMapper.klienciToKlienciBiznesowiDTO(consumer));
        });

        return businessClientsList;
    }

    public void createBusinessClient(@Validated KlienciBiznesowi klientBiznesowy) {
        Klienci klient = klienciMapper.klienciBiznesowiToKlienci(klientBiznesowy);
        Uzytkownicy uzytownik = uzytkownicyRepository.findByEmail(klient.getUzytkownik().getEmail()).orElse(null);

        if(uzytownik == null) {
            throw new ObjectExistInDBException("Nie ma takiego użytkownika");
        }

        repository.findByNip(klientBiznesowy.getNip()).ifPresent(value -> {
            throw new ObjectExistInDBException("Użytkownik już zarejestrowany!");
        });

        klient.setUzytkownik(uzytownik);

        repository.save(klient);
    }

    boolean clientExistForAccount(String email) {
        Uzytkownicy uzytkownik = uzytkownicyRepository.findByEmail(email).orElse(null);

        if (uzytkownik != null) {
           Klienci klient = repository.findByUzytkownikId(uzytkownik.getId()).orElse(null);

           return klient != null;
        }

        throw new ObjectNotExistInDBException("Nie ma takiego rekordu w DB");
    }
}
