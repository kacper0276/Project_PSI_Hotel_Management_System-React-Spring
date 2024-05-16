package psi.projekt.hotel.klienci;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.projection.KlienciPrywatni;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/klienci")
public class KlienciController {
    private final KlienciService service;

    public KlienciController(KlienciService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<Klienci>> findClientById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.getClientById(id));
    }

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List<Klienci>> findAllClients() {
        return ResponseEntity.ok(service.getAllClients());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/klienci-indywidualni")
    ResponseEntity<List<KlienciPrywatni>> getAllPrivateClients() {
        return ResponseEntity.ok(service.getPrivateClients());
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Response> createPrivateClient(@RequestBody KlienciPrywatni klientPrywatny) {
        service.createPrivateUser(klientPrywatny);

        return ResponseEntity.ok(new Response("Stworzono użytkownika"));
    }

}
