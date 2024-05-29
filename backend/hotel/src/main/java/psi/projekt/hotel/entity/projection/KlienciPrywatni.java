package psi.projekt.hotel.entity.projection;

import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import psi.projekt.hotel.entity.Uzytkownicy;

@Getter
@Setter
public class KlienciPrywatni {
    private String email;
    private String haslo;
    private String imie;
    private String nazwisko;

    @Setter(AccessLevel.NONE)
    private String rodzaj = "KlientIndywidualny";

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "uzytkownik_id")
    private Uzytkownicy uzytkownik;

    public KlienciPrywatni(String email, String haslo, String imie, String nazwisko) {
        this.email = email;
        this.haslo = haslo;
        this.imie = imie;
        this.nazwisko = nazwisko;
    }
}
