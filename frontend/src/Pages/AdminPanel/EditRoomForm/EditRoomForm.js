import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditRoomForm.module.css";

export default function EditRoomForm(props) {
  useWebsiteTitle("Edycja danych pokoju");

  const hideForm = (e) => {
    e.preventDefault();

    props.showForm();
  };

  return (
    <form className={`${styles.main_container}`}>
      <h2>Stwórz nową ofertę pokoju</h2>
      <button onClick={(e) => hideForm(e)}>Zamknij</button>
      <label>Cena</label>
      <input type="number" />
      <label>Data zwolnienia</label>
      <input type="date" />
      <textarea placeholder="Opis" />
      <label>Dostępność</label>
      <input type="checkbox" />
      <label>Ile osób</label>
      <input type="number" />
      <label>Typ pokoju</label>
      <input type="text" />
      <button>Dodaj pokój</button>
    </form>
  );
}
