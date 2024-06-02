import EditUserReservations from "../../../Pages/UserPanel/EditUserReservations/EditUserReservations";
import styles from "./UserMenuNavigation.module.css";

export default function UserMenuNavigation(props) {
  const panels = [<EditUserReservations />];

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
          id="1"
          onClick={(e) => {
            changeActice(e.target.id);
          }}
        >
          Zarządzaj swoimi rezerwacjami
        </button>
      </nav>
    </div>
  );
}
