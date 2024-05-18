package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "rezerwacje")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Rezerwacje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int cena;
    private String nazwiskoKlienta;
    private String nrTelKontaktowy;
    private String formaZaplaty;
    private Date dataRezerwacji;
    private String status;
    private Date dataZameldowania;
    private Date dataWymeldowania;

    // Klucze obce
    @ManyToOne
    @JoinColumn(name = "pokoj_nrPokoju")
    private Pokoje pokoj;

    @ManyToOne
    @JoinColumn(name = "klient_idKlienta")
    private Klienci klient;

    @ManyToOne
    @JoinColumn(name = "platnosc_nrPlatnosci")
    private Platnosci platnosc;
}
