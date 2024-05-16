package psi.projekt.hotel.entity.projection;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KlienciBiznesowi {
    private String email;
    private String haslo;
    private String nip;
    private String nazwaFirmy;

    @Setter(AccessLevel.NONE)
    private String rodzaj = "KlientBizesowy";

    @Setter(AccessLevel.NONE)
    private String rola = "Klient";

    public KlienciBiznesowi(String email, String haslo, String nip, String nazwaFirmy) {
        this.email = email;
        this.haslo = haslo;
        this.nip = nip;
        this.nazwaFirmy = nazwaFirmy;
    }
}
