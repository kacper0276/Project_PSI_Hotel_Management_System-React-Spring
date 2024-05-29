import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditRooms.module.css";
import axios from "axios";
import { API_URL } from "../../../App";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import EditRoomForm from "../EditRoomForm/EditRoomForm";

export default function EditRooms() {
  useWebsiteTitle("Edytuj rezerwacje");
  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState(null);

  async function fetchRooms() {
    await axios.get(`${API_URL}/pokoje`).then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }

  async function fetchRoomDetails(e, id) {
    e.preventDefault();

    await axios.get(`${API_URL}/pokoje/${id}`).then((res) => {
      console.log(res.data);
      setRoomData(res.data);
    });
  }

  const deleteRoom = (e, id) => {
    e.preventDefault();

    axios.delete(`${API_URL}/pokoje/${id}`).then((res) => {
      fetchRooms();
    });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <h2>Zarządzaj użytkownikami</h2>
      <table className={`${styles.user_data_table}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dostępność</th>
            <th>Data zwolnienia</th>
            <th>Cena</th>
            <th>Typ Pokoju</th>
            <th>Ile osób</th>
            <th>Wyposażenie</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, key) => {
            return (
              <tr key={key}>
                <td>{room.id}</td>
                <td>{room.dostepnosc ? "Dostępny" : "Niedostępny"}</td>
                <td>{cutTimeInDateTime(room.dataZwolnienia)}</td>
                <td>{room.cena}</td>
                <td>{room.typPokoju}</td>
                <td>{room.ileOsob}</td>
                <td>{room.wyposazenie}</td>
                <td>
                  <button onClick={(e) => deleteRoom(e, room.id)}>Usuń</button>
                </td>
                <td>
                  <button onClick={(e) => fetchRoomDetails(e, room.id)}>
                    Edytuj
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {roomData != null ? (
        <EditRoomForm showForm={setRoomData} roomData />
      ) : null}
    </div>
  );
}
