import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditRooms.module.css";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import EditRoomForm from "../EditRoomForm/EditRoomForm";
import RoomService from "../../../services/Room.service";

export default function EditRooms() {
  useWebsiteTitle("Edytuj rezerwacje");
  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState(null);

  async function fetchRooms() {
    setRooms(await RoomService.getAllRooms());
  }

  async function fetchRoomDetails(e, id) {
    e.preventDefault();

    setRoomData(await RoomService.getRoomDetails(id));
  }

  const deleteRoom = (e, id) => {
    e.preventDefault();

    RoomService.deleteRoom(id).then(() => {
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
                <td>
                  {room.dataZwolnienia != null
                    ? cutTimeInDateTime(room.dataZwolnienia)
                    : "Wolny"}
                </td>
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
        <EditRoomForm showForm={setRoomData} roomData={roomData} />
      ) : null}
    </div>
  );
}
