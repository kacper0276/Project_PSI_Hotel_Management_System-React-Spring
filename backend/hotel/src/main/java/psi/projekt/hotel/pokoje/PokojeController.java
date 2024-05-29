package psi.projekt.hotel.pokoje;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.projection.PokojeDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pokoje")
@CrossOrigin(origins = "http://localhost:3000")
public class PokojeController {
    private final PokojeService service;

    public PokojeController(PokojeService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<PokojeDTO>> getRoomById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.getRoomDetailsById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<PokojeDTO>> getAllRooms() {
        return ResponseEntity.ok(service.getAllRooms());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/wolne-pokoje")
    ResponseEntity<List<PokojeDTO>> getEmptyRooms() {
        return ResponseEntity.ok(service.getEmptyRooms());
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/zmien-dostepnosc/{id}")
    ResponseEntity<Response> changeRoomAvailability(@PathVariable Integer id) {
        service.changeRoomAvailability(id);

        return ResponseEntity.ok(new Response("Zmieniono dostępność pokoju"));
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    ResponseEntity<Response> createRoom(@RequestBody Pokoje pokoj) {
        service.createRoom(pokoj);

        return ResponseEntity.ok(new Response("Dodano pokój"));
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/zmien-dane/{id}")
    ResponseEntity<Response> changeRoomData(@RequestBody Pokoje pokoj) {
        service.changeRoomData(pokoj);

        return ResponseEntity.ok(new Response("Zmieniono dane pokoju"));
    }
}
