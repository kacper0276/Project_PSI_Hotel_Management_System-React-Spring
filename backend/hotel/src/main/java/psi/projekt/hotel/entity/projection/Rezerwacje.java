package psi.projekt.hotel.entity.projection;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Rezerwacje")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rezerwacje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int cena;
    private String nazwiskoKlienta;
    private String nrTelKontaktowy;
}
