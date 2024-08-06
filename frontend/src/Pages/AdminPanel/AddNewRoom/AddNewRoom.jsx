import { useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./AddNewRoom.module.css";
import RoomService from "../../../services/Room.service";

export default function AddNewRoom() {
  useWebsiteTitle("Stwórz nową rezerwację");
  const [newRoomData, setNewRoomData] = useState({
    dostepnosc: false,
    dataZwolnienia: "2024-02-02",
    cena: 0,
    typPokoju: "",
    wyposazenie: "",
    ileOsob: 0,
    zdjecia: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoomData({
      ...newRoomData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onFileChange = (e) => {
    setNewRoomData({ ...newRoomData, zdjecia: e.target.files });
  };

  const onAddRoom = (e) => {
    e.preventDefault();

    RoomService.createNewRoom(newRoomData).then((res) => {
      console.log(res);
    });
  };

  return (
    <form className={`${styles.main_container}`}>
      <h2>Stwórz nową ofertę pokoju</h2>
      <label>Cena</label>
      <input
        type="number"
        name="cena"
        value={newRoomData.cena}
        onChange={handleChange}
      />
      <textarea
        placeholder="Opis"
        name="wyposazenie"
        value={newRoomData.wyposazenie}
        onChange={handleChange}
      />
      <label>Dostępność</label>
      <input
        type="checkbox"
        name="dostepnosc"
        checked={newRoomData.dostepnosc}
        onChange={handleChange}
      />
      <label>Ile osób</label>
      <input
        type="number"
        name="ileOsob"
        value={newRoomData.ileOsob}
        onChange={handleChange}
      />
      <label>Typ pokoju</label>
      <select id="roomType" onChange={handleChange} name="typPokoju">
        <option value="">Wybierz rodzaj pokoju</option>
        <option value="Apartament">Apartament</option>
        <option value="Double">Podwójny pokój</option>
        <option value="Single">Pojedynczy pokój</option>
      </select>
      <label>Zdjęcia</label>
      <input type="file" onChange={onFileChange} multiple />
      <button onClick={onAddRoom}>Dodaj pokój</button>
    </form>
  );
}
