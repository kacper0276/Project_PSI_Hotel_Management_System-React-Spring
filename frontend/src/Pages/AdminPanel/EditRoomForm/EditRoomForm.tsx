import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditRoomForm.module.css";

interface RoomData {
  dostepnosc: boolean;
  dataZwolnienia: string | null;
  cena: number;
  typPokoju: string;
  wyposazenie: string;
  ileOsob: number;
  zdjecia: string[];
}

interface EditRoomFormProps {
  roomData: RoomData;
  showForm: () => void;
}

export default function EditRoomForm({
  roomData,
  showForm,
}: EditRoomFormProps) {
  useWebsiteTitle("Edycja danych pokoju");

  const [editRoomData, setEditRoomData] = useState<RoomData>({
    dostepnosc: false,
    dataZwolnienia: "2024-02-02",
    cena: 0,
    typPokoju: "",
    wyposazenie: "",
    ileOsob: 0,
    zdjecia: [],
  });

  const hideForm = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showForm();
  };

  useEffect(() => {
    setEditRoomData({
      dostepnosc: roomData.dostepnosc,
      dataZwolnienia: roomData.dataZwolnienia ?? "",
      cena: roomData.cena,
      typPokoju: roomData.typPokoju,
      wyposazenie: roomData.wyposazenie,
      ileOsob: roomData.ileOsob,
      zdjecia: roomData.zdjecia,
    });
  }, [roomData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setEditRoomData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setEditRoomData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <form className={styles.main_container}>
      <h2>Edycja danych pokoju</h2>
      <button onClick={hideForm}>Zamknij</button>

      <label>Cena</label>
      <input
        type="number"
        name="cena"
        value={editRoomData.cena}
        onChange={handleInputChange}
      />

      <label>Data zwolnienia</label>
      <input
        type="date"
        name="dataZwolnienia"
        value={editRoomData.dataZwolnienia || ""}
        onChange={handleInputChange}
      />

      <textarea
        placeholder="Opis"
        name="wyposazenie"
        value={editRoomData.wyposazenie}
        onChange={handleInputChange}
      />

      <label>Dostępność</label>
      <input
        type="checkbox"
        name="dostepnosc"
        checked={editRoomData.dostepnosc}
        onChange={handleInputChange}
      />

      <label>Ile osób</label>
      <input
        type="number"
        name="ileOsob"
        value={editRoomData.ileOsob}
        onChange={handleInputChange}
      />

      <label>Typ pokoju</label>
      <select
        id="roomType"
        name="typPokoju"
        value={editRoomData.typPokoju}
        onChange={handleInputChange}
      >
        <option value="">Wybierz rodzaj pokoju</option>
        <option value="Apartament">Apartament</option>
        <option value="Double">Podwójny pokój</option>
        <option value="Single">Pojedynczy pokój</option>
      </select>

      <label>
        Ilość zdjęć: {editRoomData.zdjecia.length}; Możesz zostawić zdjęcia, lub
        usunąć obecne i dodać nowe na ich miejsce
      </label>

      <button type="submit">Edytuj pokój</button>
    </form>
  );
}
