import styles from "./AdminMenuNavigation.module.css";
import ManageUsers from "../../../Pages/AdminPanel/ManageUsers/ManageUsers";
import EditUserData from "../../../Pages/AdminPanel/EditUserData/EditUserData";
import AddNewRoom from "../../../Pages/AdminPanel/AddNewRoom/AddNewRoom";
import EditRooms from "../../../Pages/AdminPanel/EditRooms/EditRooms";

export default function AdminMenuNavigation(props) {
  const panels = [
    <ManageUsers />,
    <EditUserData />,
    <AddNewRoom />,
    <EditRooms />,
  ];

  const changeActice = (id) => {
    const prev = document.querySelector(`.${styles.btn_active_cms}`);
    if (prev) {
      prev.classList.remove(`${styles.btn_active_cms}`);
    }
    document.getElementById(`${id}`).classList.add(`${styles.btn_active_cms}`);

    props.panel(panels[id]);
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.cms_nav_title}`}>Opcje panelu</div>
      <nav className={`${styles.main_cms_nav_cnt}`}>
        <button
          className={`${styles.cms_nav_btn}`}
          id="0"
          onClick={(e) => {
            changeActice(e.target.id);
          }}
        >
          Ustawienia użytkowników
        </button>
        <button
          className={`${styles.cms_nav_btn}`}
          id="1"
          onClick={(e) => {
            changeActice(e.target.id);
          }}
        >
          Ustawienia danych administratora
        </button>
        <button
          className={`${styles.cms_nav_btn}`}
          id="2"
          onClick={(e) => {
            changeActice(e.target.id);
          }}
        >
          Dodaj nową ofertę pokoju
        </button>
        <button
          className={`${styles.cms_nav_btn}`}
          id="3"
          onClick={(e) => {
            changeActice(e.target.id);
          }}
        >
          Edytuj oferty pokoi
        </button>
      </nav>
    </div>
  );
}
