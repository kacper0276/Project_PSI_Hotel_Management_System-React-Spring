package psi.projekt.hotel.entity.projection;

import lombok.Getter;
import lombok.Setter;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;

@Getter
@Setter
public class UzytkownicyDTO {
    private int id;
    private String email;
    private String haslo;
    private RolaUzytkownika rola;
}
