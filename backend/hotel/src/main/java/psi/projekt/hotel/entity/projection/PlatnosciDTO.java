package psi.projekt.hotel.entity.projection;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class PlatnosciDTO {
    private int id;
    private String metodaPlatnosci;
    private String statusPlatnosci;
    private int kwota;
    private Date dataPlatnosci;
    private Set<Integer> rezerwacje_id;
}
