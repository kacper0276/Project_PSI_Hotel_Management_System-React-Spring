import { useEffect, useState } from "react";
import styles from "./ManageReservations.module.css";
import axios from "axios";
import { API_URL } from "../../../App";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";

export default function ManageReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    await axios.get(`${API_URL}/rezerwacje`).then((res) => {
      console.log(res);
      setReservations(res.data);
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
            <th>ID</th>
            <th>Cena</th>
            <th>NazwiskoKlienta</th>
            <th>Nr Tel</th>
            <th>Data Wymeldowania</th>
            <th>Data Zameldowania</th>
            <th>Data Rezerwacji</th>
            <th>Status</th>
            <th>ID Pokoju</th>
            <th>ID Płatności</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, key) => {
            return (
              <tr key={key}>
                <td>{reservation.id}</td>
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
                  <button>Usuń</button>
                </td>
                <td>
                  <button>Edytuj</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
