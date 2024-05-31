import { useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./AddNewRoom.module.css";
import axios from "axios";
import { API_URL } from "../../../App";

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

    const formData = new FormData();

    for (const key of Object.keys(newRoomData.zdjecia)) {
      formData.append("zdjecia", newRoomData.zdjecia[key]);
    }
    formData.append("dostepnosc", newRoomData.dostepnosc);
    formData.append("dataZwolnienia", newRoomData.dataZwolnienia);
    formData.append("cena", newRoomData.cena);
    formData.append("typPokoju", newRoomData.typPokoju);
    formData.append("wyposazenie", newRoomData.wyposazenie);
    formData.append("ileOsob", newRoomData.ileOsob);

    axios
      .post(`${API_URL}/pokoje`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
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
      <input
        type="text"
        name="typPokoju"
        value={newRoomData.typPokoju}
        onChange={handleChange}
      />
      <label>Zdjęcia</label>
      <input type="file" onChange={onFileChange} multiple />
      <button onClick={onAddRoom}>Dodaj pokój</button>
    </form>
  );
}
