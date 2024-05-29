package psi.projekt.hotel.rezerwacje;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.Rezerwacje;
import psi.projekt.hotel.entity.projection.RezerwacjeDTO;

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
    ResponseEntity<List<RezerwacjeDTO>> getAllReservation() {
        return ResponseEntity.ok(service.getAllReservation());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<RezerwacjeDTO>> getReservationById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getReservationById(id));
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    ResponseEntity<Response> createReservation(@RequestBody RezerwacjeDTO rezerwacja) {
        service.createReservation(rezerwacja);

        return ResponseEntity.ok(new Response("Stworzono rezerwację"));
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/platnosc/{id}")
    ResponseEntity<Response> payRoom(@PathVariable Integer id, @RequestBody Integer paymentId) {
        service.payForRoom(id, paymentId);

        return ResponseEntity.ok(new Response("Dokonano płatności"));
    }
}
