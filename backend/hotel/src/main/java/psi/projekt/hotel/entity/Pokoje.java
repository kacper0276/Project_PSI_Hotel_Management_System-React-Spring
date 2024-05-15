package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
    private Date dataZwolnienia;
    private int cena;
    private String typPokoju;
    private String wyposazenie;
    private int ileOsob;
}
