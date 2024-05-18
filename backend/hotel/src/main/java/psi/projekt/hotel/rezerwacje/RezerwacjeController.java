package psi.projekt.hotel.rezerwacje;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rezerwacje")
public class RezerwacjeController {
    private final RezerwacjeService service;

    public RezerwacjeController(RezerwacjeService service) {
        this.service = service;
    }
}
