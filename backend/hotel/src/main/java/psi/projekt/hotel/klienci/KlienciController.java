package psi.projekt.hotel.klienci;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import psi.projekt.hotel.entity.Klienci;
import psi.projekt.hotel.entity.projection.KlienciPrywatniReadModel;

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

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<Klienci>> findAllClients() {
        return ResponseEntity.ok(service.getAllClients());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/klienci-indywidualni")
    ResponseEntity<List<KlienciPrywatniReadModel>> getAllPrivateClients() {
        return ResponseEntity.ok(service.getPrivateClients());
    }
}
