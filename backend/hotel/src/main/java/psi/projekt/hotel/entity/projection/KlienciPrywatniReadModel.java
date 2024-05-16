package psi.projekt.hotel.entity.projection;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KlienciPrywatniReadModel {
    private String email;
    private String haslo;
    private String imie;
    private String nazwisko;

    @Setter(AccessLevel.NONE)
    private String rodzaj = "KlientIndywidualny";

    @Setter(AccessLevel.NONE)
    private String rola = "Klient";

    public KlienciPrywatniReadModel(String email, String haslo, String imie, String nazwisko) {
        this.email = email;
        this.haslo = haslo;
        this.imie = imie;
        this.nazwisko = nazwisko;
    }
}
