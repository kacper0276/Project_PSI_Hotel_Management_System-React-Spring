package psi.projekt.hotel.uzytkownicy;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/uzytkownicy")
public class UzytkownicyController {
    private final UzytkownicyService service;

    public UzytkownicyController(UzytkownicyService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.POST, path = "")
    ResponseEntity<Response> createUser(@RequestBody Uzytkownicy uzytkownik) {
        service.createUser(uzytkownik);

        return ResponseEntity.ok(new Response("Stworzono użytkownika"));
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/zmien-haslo")
    ResponseEntity<Response> changeUserPassword(@RequestBody Uzytkownicy uzytkownik, @RequestBody String password) {
        service.changeUserPassword(uzytkownik, password);

        return ResponseEntity.ok(new Response("Zmieniono hasło"));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj/id/{id}")
    ResponseEntity<Optional<Uzytkownicy>> getUserById(@PathVariable("id") Integer id) {

        return ResponseEntity.ok(service.getUserById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj/email/{email}")
    ResponseEntity<Optional<Uzytkownicy>> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.getUserByEmail(email));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj/rola/{rola}")
    ResponseEntity<List<Uzytkownicy>> getUsersByRole(@PathVariable RolaUzytkownika rola) {
        return ResponseEntity.ok(service.getUsersByRole(rola));
    }
}
