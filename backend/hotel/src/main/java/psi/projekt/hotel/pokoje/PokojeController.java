package psi.projekt.hotel.pokoje;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import psi.projekt.hotel.entity.Pokoje;
import psi.projekt.hotel.entity.Response;
import psi.projekt.hotel.entity.projection.PokojeDTO;
import psi.projekt.hotel.entity.projection.PokojeDTORead;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pokoje")
@CrossOrigin(origins = "http://localhost:3000")
public class PokojeController {
    private final PokojeService service;

    public PokojeController(PokojeService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    ResponseEntity<Optional<PokojeDTORead>> getRoomById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.getRoomDetailsById(id));
    }

    @RequestMapping(method = RequestMethod.GET, path = "")
    ResponseEntity<List<PokojeDTORead>> getAllRooms() {
        return ResponseEntity.ok(service.getAllRooms());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/wolne-pokoje")
    ResponseEntity<List<PokojeDTO>> getEmptyRooms() {
        return ResponseEntity.ok(service.getEmptyRooms());
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/zmien-dostepnosc/{id}")
    ResponseEntity<Response> changeRoomAvailability(@PathVariable Integer id) {
        service.changeRoomAvailability(id);

        return ResponseEntity.ok(new Response("Zmieniono dostępność pokoju"));
    }

    @RequestMapping(method = RequestMethod.POST, path = "", consumes = {"multipart/form-data"})
    ResponseEntity<Response> createRoom( @RequestParam("dostepnosc") Boolean dostepnosc,
                                         @RequestParam("dataZwolnienia") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataZwolnienia,
                                         @RequestParam("cena") Integer cena,
                                         @RequestParam("typPokoju") String typPokoju,
                                         @RequestParam("wyposazenie") String wyposazenie,
                                         @RequestParam("ileOsob") Integer ileOsob,
                                         @RequestParam("zdjecia") MultipartFile[] zdjecia) {

        PokojeDTO pokoj = new PokojeDTO();
        pokoj.setDostepnosc(dostepnosc);
        pokoj.setDataZwolnienia(null);
        pokoj.setCena(cena);
        pokoj.setTypPokoju(typPokoju);
        pokoj.setWyposazenie(wyposazenie);
        pokoj.setIleOsob(ileOsob);
        pokoj.setZdjecia(zdjecia);

        service.createRoom(pokoj);

        return ResponseEntity.ok(new Response("Dodano pokój"));
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/zmien-dane/{id}")
    ResponseEntity<Response> changeRoomData(@RequestBody Pokoje pokoj) {
        service.changeRoomData(pokoj);

        return ResponseEntity.ok(new Response("Zmieniono dane pokoju"));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/szukaj-ofert")
    ResponseEntity<PokojeDTORead> findRooms(@RequestParam String dateFrom,
                                       @RequestParam String dateTo,
                                       @RequestParam String roomType,
                                       @RequestParam int persons) throws ParseException {
        return ResponseEntity.ok(service.findRoomForUser(dateFrom, dateTo, roomType, persons));
    }
}