import { useEffect, useState } from "react";
import styles from "./ManageReservations.module.css";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import ReservationService from "../../../services/Reservation.service";

export default function ManageReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    setReservations(await ReservationService.getAllReservations());
  };

  const deleteReservations = (id) => {
    ReservationService.deleteReservation(id).then(() => {
      fetchReservations();
    });
  };

  const bookClient = async (id) => {
    ReservationService.bookClient(id).then(() => {
      fetchReservations();
    });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <h2>Zarządzanie Rezerwacjami</h2>
      <table className={`${styles.user_data_table}`}>
        <thead>
          <tr>
            <th>Cena</th>
            <th>NazwiskoKlienta</th>
            <th>Nr Tel</th>
            <th>Data Wymeldowania</th>
            <th>Data Zameldowania</th>
            <th>Data Rezerwacji</th>
            <th>Status</th>
            <th>ID Pokoju</th>
            <th>ID Płatności</th>
            <th>Czy klient zameldowany</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, key) => {
            return (
              <tr key={key}>
                <td>{reservation.cena}</td>
                <td>{reservation.nazwiskoKlienta}</td>
                <td>{reservation.nrTelKontaktowy}</td>
                <td>{cutTimeInDateTime(reservation.dataRezerwacji)}</td>
                <td>{cutTimeInDateTime(reservation.dataZameldowania)}</td>
                <td>{cutTimeInDateTime(reservation.dataWymeldowania)}</td>
                <td>{reservation.status}</td>
                <td>{reservation.pokoje_id}</td>
                <td>{reservation.platnosc_id}</td>
                <td>
                  {reservation.zameldowanie ? "Zameldowany" : "Niezameldowany"}
                </td>
                <td>
                  <button onClick={() => deleteReservations(reservation.id)}>
                    Usuń
                  </button>
                </td>
                <td>
                  <button>Edytuj</button>
                </td>
                <td>
                  <button onClick={() => bookClient(reservation.id)}>
                    Zabookuj klienta
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
