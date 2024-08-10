import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditRooms.module.css";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import EditRoomForm from "../EditRoomForm/EditRoomForm";
import RoomService from "../../../services/Room.service";
import { Room } from "../../../types/room.types";

export default function EditRooms() {
  useWebsiteTitle("Edytuj rezerwacje");

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomData, setRoomData] = useState<Room | null>(null);

  async function fetchRooms() {
    setRooms(await RoomService.getAllRooms());
  }

  async function fetchRoomDetails(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) {
    e.preventDefault();
    setRoomData(await RoomService.getRoomDetails(id));
  }

  const deleteRoom = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    await RoomService.deleteRoom(id);
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className={styles.main_container}>
      <h2>Zarządzaj pokojami</h2>
      <table className={styles.user_data_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dostępność</th>
            <th>Data zwolnienia</th>
            <th>Cena</th>
            <th>Typ Pokoju</th>
            <th>Ile osób</th>
            <th>Wyposażenie</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, key) => (
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
          ))}
        </tbody>
      </table>
      {roomData && (
        <EditRoomForm showForm={() => setRoomData(null)} roomData={roomData} />
      )}
    </div>
  );
}
