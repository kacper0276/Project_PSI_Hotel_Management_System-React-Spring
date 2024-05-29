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
public class KlienciBiznesowi {
    private String email;
    private String haslo;
    private String nip;
    private String nazwaFirmy;

    @Setter(AccessLevel.NONE)
    private String rodzaj = "KlientBizesowy";

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "uzytkownik_id")
    private Uzytkownicy uzytkownik;

    public KlienciBiznesowi(String email, String haslo, String nip, String nazwaFirmy) {
        this.email = email;
        this.haslo = haslo;
        this.nip = nip;
        this.nazwaFirmy = nazwaFirmy;
    }
}
