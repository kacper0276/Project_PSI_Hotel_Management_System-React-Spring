package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import psi.projekt.hotel.entity.enumValue.RodzajKlienta;

@Entity
@Table(name = "klienci")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Klienci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String imie;
    private String nazwisko;
    private String nip;
    private String nazwaFirmy;

    @Enumerated(EnumType.STRING)
    private RodzajKlienta rodzaj;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @NotNull
    private Uzytkownicy uzytkownicy;
}
