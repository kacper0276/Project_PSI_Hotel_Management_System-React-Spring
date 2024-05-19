package psi.projekt.hotel.rezerwacje;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.Rezerwacje;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rezerwacje")
public class RezerwacjeController {
    private final RezerwacjeService service;

    public RezerwacjeController(RezerwacjeService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<Rezerwacje>> getAllReservation() {
        return ResponseEntity.ok(service.getAllReservation());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<Rezerwacje>> getReservationById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getReservationById(id));
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    ResponseEntity<Response> createReservation(@RequestBody Rezerwacje rezerwacja) {
        service.createReservation(rezerwacja);

        return ResponseEntity.ok(new Response("Stworzono rezerwację"));
    }
}
