import styles from "./ReceptionistMenuNavigation.module.css";
import ManageReservations from "../../../Pages/ReceptionistPanel/ManageReservations/ManageReservations";

export default function ReceptionistMenuNavigation(props) {
  const panels = [<ManageReservations />];

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
          Zarządzaj rezerwacjami
        </button>
      </nav>
    </div>
  );
}
