package psi.projekt.hotel.klienci;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import psi.projekt.hotel.entity.Klienci;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/klienci")
public class KlienciController {
    private final KlienciRepository repository;

    public KlienciController(KlienciRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<Klienci>> findClientById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(repository.findById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/")
    ResponseEntity<List<Klienci>> findAllClients() {
        return ResponseEntity.ok(repository.findAll());
    }
}
