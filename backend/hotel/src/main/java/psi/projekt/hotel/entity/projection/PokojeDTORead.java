package psi.projekt.hotel.entity.projection;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PokojeDTORead {
    private int id;

    private boolean dostepnosc;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataZwolnienia;
    private int cena;
    private String typPokoju;
    private String wyposazenie;
    private int ileOsob;
    private List<String> zdjecia;
}
