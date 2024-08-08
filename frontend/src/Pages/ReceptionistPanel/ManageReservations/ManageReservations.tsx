import { useEffect, useState } from "react";
import styles from "./ManageReservations.module.css";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import ReservationService from "../../../services/Reservation.service";

interface Reservation {
  id: number;
  cena: number;
  nazwiskoKlienta: string;
  nrTelKontaktowy: string;
  dataRezerwacji: string | null;
  dataZameldowania: string | null;
  dataWymeldowania: string | null;
  status: string;
  pokoje_id: number;
  platnosc_id: number;
  zameldowanie: boolean;
}

export default function ManageReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      const data = await ReservationService.getAllReservations();
      setReservations(data);
    } catch (err) {
      setError("Failed to fetch reservations");
      console.error(err);
    }
  };

  const deleteReservations = async (id: number) => {
    try {
      await ReservationService.deleteReservation(id);
      fetchReservations();
    } catch (err) {
      setError("Failed to delete reservation");
      console.error(err);
    }
  };

  const bookClient = async (id: number) => {
    try {
      await ReservationService.bookClient(id);
      fetchReservations();
    } catch (err) {
      setError("Failed to book client");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <h2>Zarządzanie Rezerwacjami</h2>
      {error && <div className="error-message">{error}</div>}
      <table className={`${styles.user_data_table}`}>
        <thead>
          <tr>
            <th>Cena</th>
            <th>Nazwisko Klienta</th>
            <th>Nr Tel</th>
            <th>Data Rezerwacji</th>
            <th>Data Zameldowania</th>
            <th>Data Wymeldowania</th>
            <th>Status</th>
            <th>ID Pokoju</th>
            <th>ID Płatności</th>
            <th>Czy klient zameldowany</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.cena}</td>
              <td>{reservation.nazwiskoKlienta}</td>
              <td>{reservation.nrTelKontaktowy}</td>
              <td>
                {reservation.dataRezerwacji
                  ? cutTimeInDateTime(reservation.dataRezerwacji)
                  : "BRAK"}
              </td>
              <td>
                {reservation.dataZameldowania
                  ? cutTimeInDateTime(reservation.dataZameldowania)
                  : "BRAK"}
              </td>
              <td>
                {reservation.dataWymeldowania
                  ? cutTimeInDateTime(reservation.dataWymeldowania)
                  : "BRAK"}
              </td>
              <td>{reservation.status}</td>
              <td>{reservation.pokoje_id}</td>
              <td>{reservation.platnosc_id}</td>
              <td>
                {reservation.zameldowanie ? "Zameldowany" : "Niezameldowany"}
              </td>
              <td>
                <button
                  onClick={() => deleteReservations(reservation.id)}
                  aria-label="Usuń rezerwację"
                >
                  Usuń
                </button>
              </td>
              <td>
                <button aria-label="Edytuj rezerwację">Edytuj</button>
              </td>
              <td>
                <button
                  onClick={() => bookClient(reservation.id)}
                  aria-label="Zabookuj klienta"
                >
                  Zabookuj klienta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
