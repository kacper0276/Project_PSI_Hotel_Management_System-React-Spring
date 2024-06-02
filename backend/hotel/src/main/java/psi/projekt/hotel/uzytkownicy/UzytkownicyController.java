package psi.projekt.hotel.uzytkownicy;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;
import psi.projekt.hotel.entity.other.LoginUser;
import psi.projekt.hotel.entity.projection.UzytkownicyDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/uzytkownicy")
@CrossOrigin(origins = "http://localhost:3000")
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

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<UzytkownicyDTO>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj/id/{id}")
    ResponseEntity<Optional<UzytkownicyDTO>> getUserById(@PathVariable("id") Integer id) {

        return ResponseEntity.ok(service.getUserById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj/email/{email}")
    ResponseEntity<Optional<UzytkownicyDTO>> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.getUserByEmail(email));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj/rola/{rola}")
    ResponseEntity<List<UzytkownicyDTO>> getUsersByRole(@PathVariable RolaUzytkownika rola) {
        return ResponseEntity.ok(service.getUsersByRole(rola));
    }


    @RequestMapping(method = RequestMethod.POST, path = "/zaloguj")
    ResponseEntity<Response> loginUser(@RequestBody LoginUser user) {
        return ResponseEntity.ok(new Response(service.loginUser(user.getEmail(), user.getHaslo())));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/zmien-dane/{id}")
    ResponseEntity<Response> changeUserData(@RequestBody Uzytkownicy uzytkownik, @PathVariable Integer id) {
        service.changeUserData(uzytkownik, id);

        return ResponseEntity.ok(new Response("Zmieniono dane uzytkownika"));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    ResponseEntity<Response> deleteUser(@PathVariable Integer id) {
        service.deleteUser(id);

        return ResponseEntity.ok(new Response("Usunieto uzytkownika"));
    }
}
