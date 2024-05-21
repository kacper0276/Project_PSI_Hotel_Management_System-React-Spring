package psi.projekt.hotel.entity.projection;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RezerwacjeDTO {
    private int id;
    private int cena;
    private String nazwiskoKlienta;
    private String nrTelKontaktowy;
    private String formaZaplaty;
    private Date dataRezerwacji;
    private String status;
    private Date dataZameldowania;
    private Date dataWymeldowania;
    private int pokoje_id;
    private int platnosc_id;
    private int klient_id;
}
