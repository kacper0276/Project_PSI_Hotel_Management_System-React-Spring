package psi.projekt.hotel.entity.projection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KlienciPrywatniDTO {
    private String email;
    private String haslo;
    private String imie;
    private String nazwisko;
    private String rodzaj = "KlientBiznesowy";
}
