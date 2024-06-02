import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditRoomForm.module.css";

export default function EditRoomForm(props) {
  useWebsiteTitle("Edycja danych pokoju");

  const [editRoomData, setEditRoomData] = useState({
    dostepnosc: false,
    dataZwolnienia: "2024-02-02",
    cena: 0,
    typPokoju: "",
    wyposazenie: "",
    ileOsob: 0,
    zdjecia: [],
  });

  const hideForm = (e) => {
    e.preventDefault();

    props.showForm();
  };

  useEffect(() => {
    setEditRoomData({
      dostepnosc: props.roomData.dostepnosc,
      dataZwolnienia:
        props.roomData.dataZwolnienia == null
          ? ""
          : props.roomData.dataZwolnienia,
      cena: props.roomData.cena,
      typPokoju: props.roomData.typPokoju,
      wyposazenie: props.roomData.wyposazenie,
      ileOsob: props.roomData.ileOsob,
      zdjecia: props.roomData.zdjecia,
    });
  }, []);

  return (
    <form className={`${styles.main_container}`}>
      <h2>Stwórz nową ofertę pokoju</h2>
      <button onClick={(e) => hideForm(e)}>Zamknij</button>
      <label>Cena</label>
      <input
        type="number"
        value={editRoomData.cena}
        onChange={(e) => {
          setEditRoomData({ ...editRoomData, cena: e.target.value });
        }}
      />
      <label>Data zwolnienia</label>
      <input
        type="date"
        value={editRoomData.dataZwolnienia}
        onChange={(e) => {
          setEditRoomData({ ...editRoomData, dataZwolnienia: e.target.value });
        }}
      />
      <textarea
        placeholder="Opis"
        value={editRoomData.wyposazenie}
        onChange={(e) => {
          setEditRoomData({ ...editRoomData, wyposazenie: e.target.value });
        }}
      />
      <label>Dostępność</label>
      <input
        type="checkbox"
        checked={editRoomData.dostepnosc}
        onChange={(e) => {
          setEditRoomData({ ...editRoomData, dostepnosc: e.target.value });
        }}
      />
      <label>Ile osób</label>
      <input
        type="number"
        value={editRoomData.ileOsob}
        onChange={(e) => {
          setEditRoomData({ ...editRoomData, ileOsob: e.target.value });
        }}
      />
      <label>Typ pokoju</label>
      <select
        id="roomType"
        onChange={(e) =>
          setEditRoomData({ ...editRoomData, typPokoju: e.target.value })
        }
      >
        <option value="Apartament">Apartament</option>
        <option value="Podwójny">Podwójny pokój</option>
        <option value="Pojedynczy">Pojedynczy pokój</option>
      </select>
      <label>
        Ilość zdjęć: {editRoomData.zdjecia.length}; Możesz zostawić zdjęcia, lub
        usunąć obecne i dodać nowe na ich miejsce
      </label>
      <button>Edytuj pokój</button>
    </form>
  );
}
