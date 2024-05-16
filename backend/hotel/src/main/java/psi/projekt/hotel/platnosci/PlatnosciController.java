package psi.projekt.hotel.platnosci;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import psi.projekt.hotel.entity.Platnosci;

import java.util.List;

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
}
