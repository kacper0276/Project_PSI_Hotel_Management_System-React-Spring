package psi.projekt.hotel.rezerwacje;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.Rezerwacje;
import psi.projekt.hotel.entity.projection.RezerwacjeDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rezerwacje")
@CrossOrigin(origins = "http://localhost:3000")
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

    @Transactional
    @RequestMapping(method = RequestMethod.POST, path = "/{useremail}")
    ResponseEntity<Response> createReservation(@RequestBody RezerwacjeDTO rezerwacja, @PathVariable String useremail) {
        Rezerwacje rezerwacjaDodana = service.createReservation(rezerwacja, useremail);

        return ResponseEntity.ok(new Response(rezerwacjaDodana.getId() + ""));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    ResponseEntity<Response> deleteReservation(@PathVariable Integer id) {
        service.deleteReservation(id);

        return ResponseEntity.ok(new Response("Usunięto rezerwacje"));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/rezerwacje-uzytkownika/{uzytkownik}")
    ResponseEntity<List<RezerwacjeDTO>> getUserReservation(@PathVariable String uzytkownik) {
        return ResponseEntity.ok(service.getUserReservations(uzytkownik));
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/platnosc/{id}")
    ResponseEntity<Response> payRoom(@PathVariable Integer id, @RequestBody Integer paymentId) {
        service.payForRoom(id, paymentId);

        return ResponseEntity.ok(new Response("Dokonano płatności"));
    }
}
