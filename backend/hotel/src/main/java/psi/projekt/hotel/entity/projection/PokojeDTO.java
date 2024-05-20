package psi.projekt.hotel.entity.projection;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PokojeDTO {
    private int id;
    private boolean dostepnosc;
    private Date dataZwolnienia;
    private int cena;
    private String typPokoju;
    private String wyposazenie;
    private int ileOsob;
}
