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
    private final PokojeService service;

    public PokojeController(PokojeService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<Pokoje>> getRoomById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.getRoomDetailsById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<Pokoje>> getAllRooms() {
        return ResponseEntity.ok(service.getAllRooms());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/wolne-pokoje")
    ResponseEntity<List<Pokoje>> getEmptyRooms() {
        return ResponseEntity.ok(service.getEmptyRooms());
    }
}
