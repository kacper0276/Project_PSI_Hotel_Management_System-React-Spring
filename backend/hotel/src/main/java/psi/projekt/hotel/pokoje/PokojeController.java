package psi.projekt.hotel.pokoje;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import psi.projekt.hotel.entity.Pokoje;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pokoje")
public class PokojeController {
    private final PokojeRepository repository;

    public PokojeController(PokojeRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<Pokoje>> getRoomById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(repository.findById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/")
    ResponseEntity<List<Pokoje>> getAllRooms() {
        return ResponseEntity.ok(repository.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/wolne-pokoje")
    ResponseEntity<List<Pokoje>> getEmptyRooms() {
        return ResponseEntity.ok(repository.findByDostepnoscIsTrue());
    }
}
