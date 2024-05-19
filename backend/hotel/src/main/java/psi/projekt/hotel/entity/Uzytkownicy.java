package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psi.projekt.hotel.entity.enumValue.RolaUzytkownika;

@Table(name = "uzytkownicy")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Uzytkownicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Email
    @Min(5)
    private String email;

    @Min(8)
    private String haslo;

    @Enumerated(EnumType.STRING)
    private RolaUzytkownika rola;

    @OneToOne(mappedBy = "uzytkownik")
    private Klienci klient;
}