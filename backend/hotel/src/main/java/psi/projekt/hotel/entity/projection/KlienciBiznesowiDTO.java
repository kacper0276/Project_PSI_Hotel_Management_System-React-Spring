package psi.projekt.hotel.entity.projection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KlienciBiznesowiDTO {
    private String email;
    private String haslo;
    private String nip;
    private String nazwaFirmy;
    private String rodzaj = "KlientBiznesowy";
}
