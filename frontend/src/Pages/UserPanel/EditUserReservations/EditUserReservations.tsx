import "./EditUserReservations.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { useEffect, useState } from "react";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import ReservationService from "../../../services/Reservation.service";
import useMainContext from "../../../hooks/useMainContext";
import { Reservation } from "../../../types/reservation.types";

export default function EditUserReservations() {
  useWebsiteTitle("Zarządzaj swoimi rezerwacjami");

  const { state } = useMainContext();
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);

  const fetchUserReservations = async () => {
    try {
      const reservations = await ReservationService.fetchUserReservations(
        state.username
      );
      setUserReservations(reservations);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    }
  };

  const deleteReservations = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    try {
      await ReservationService.deleteReservation(id);
      fetchUserReservations();
    } catch (error) {
      console.error("Failed to delete reservation", error);
    }
  };

  useEffect(() => {
    fetchUserReservations();
  }, [state.username]);

  return (
    <div className={`main_container`}>
      <h2>Zarządzaj rezerwacjami</h2>
      <table className={`user_data_table`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Rezerwacji</th>
            <th>Data Zameldowania</th>
            <th>Data Wymeldowania</th>
            <th>Cena</th>
            <th>Forma Zapłaty</th>
            <th>Status płatności</th>
            <th>Nazwisko Klienta</th>
            <th>Numer tel kontaktowy</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {userReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
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
              <td>{reservation.cena}</td>
              <td>{reservation.formaZaplaty}</td>
              <td>{reservation.status}</td>
              <td>{reservation.nazwiskoKlienta}</td>
              <td>{reservation.nrTelKontaktowy}</td>
              <td>
                <button onClick={(e) => deleteReservations(e, reservation.id)}>
                  Anuluj Rezerwację
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
