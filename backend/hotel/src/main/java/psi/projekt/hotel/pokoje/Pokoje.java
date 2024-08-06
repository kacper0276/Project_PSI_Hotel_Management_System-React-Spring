package psi.projekt.hotel.pokoje;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import psi.projekt.hotel.rezerwacje.Rezerwacje;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Table(name = "Pokoje")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Pokoje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private boolean dostepnosc;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataZwolnienia;
    private int cena;
    private String typPokoju;
    private String wyposazenie;
    private int ileOsob;
    private List<String> zdjecia;

    @OneToMany(mappedBy = "pokoj")
    private Set<Rezerwacje> rezerwacje;
}
