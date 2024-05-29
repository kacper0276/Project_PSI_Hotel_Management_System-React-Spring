package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull(message = "Nie może być pusty")
    @Email(message = "Musi być typ email")
    private String email;

    @Size(min = 8, message = "Hasło musi zawierać co najmniej 8 znaków")
    private String haslo;

    @Enumerated(EnumType.STRING)
    private RolaUzytkownika rola;

    @OneToOne(mappedBy = "uzytkownik")
    private Klienci klient;
}