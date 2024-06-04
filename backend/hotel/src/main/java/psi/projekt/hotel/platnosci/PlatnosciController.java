package psi.projekt.hotel.platnosci;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Platnosci;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.projection.PlatnosciDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/platnosci")
@CrossOrigin(origins = "http://localhost:3000")
public class PlatnosciController {
    private final PlatnosciService service;

    public PlatnosciController(PlatnosciService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<PlatnosciDTO>> getAllPayments() {
        return ResponseEntity.ok(service.getAllPayments());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<PlatnosciDTO>> getPaymentById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getPaymentById(id));
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    ResponseEntity<Response> addPayment(@RequestBody Platnosci platnosc) {
        Platnosci platnoscDodana = service.addPayment(platnosc);

        return ResponseEntity.ok(new Response(platnoscDodana.getId() + ""));
    }
}
