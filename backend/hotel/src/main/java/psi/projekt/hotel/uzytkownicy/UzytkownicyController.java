package psi.projekt.hotel.uzytkownicy;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/uzytkownicy")
public class UzytkownicyController {
    private final UzytkownicyService service;

    public UzytkownicyController(UzytkownicyService service) {
        this.service = service;
    }
}
