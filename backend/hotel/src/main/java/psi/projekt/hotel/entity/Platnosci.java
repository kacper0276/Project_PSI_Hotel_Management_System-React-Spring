package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "Platnosci")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Platnosci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String metodaPlatnosci;
    private String statusPlatnosci;
    private int kwota;
    private Date dataPlatnosci;
}
