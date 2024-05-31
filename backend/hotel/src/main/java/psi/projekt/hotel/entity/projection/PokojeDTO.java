package psi.projekt.hotel.entity.projection;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
public class PokojeDTO {
    private int id;
    private boolean dostepnosc;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataZwolnienia;
    private int cena;
    private String typPokoju;
    private String wyposazenie;
    private int ileOsob;
    private MultipartFile[] zdjecia;
}
