package psi.projekt.hotel.platnosci;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Platnosci;
import psi.projekt.hotel.entity.Response;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/platnosci")
public class PlatnosciController {
    private final PlatnosciService service;

    public PlatnosciController(PlatnosciService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<Platnosci>> getAllPayments() {
        return ResponseEntity.ok(service.getAllPayments());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<Platnosci>> getPaymentById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getPaymentById(id));
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    ResponseEntity<Response> addPayment(@RequestBody Platnosci platnosc) {
        service.addPayment(platnosc);

        return ResponseEntity.ok(new Response("Zarejestrowano platnosc"));
    }
}
