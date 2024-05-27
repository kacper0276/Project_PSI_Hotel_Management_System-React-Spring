import AdminMenuNavigation from "../../../Layout/partials/AdminMenuNavigation/AdminMenuNavigation";
import styles from "./MainAdminPanel.module.css";

export default function MainAdminPanel() {
  return (
    <div className={`${styles.main_container}`}>
      <AdminMenuNavigation />
      <div className={`${styles.container}`}>Reszta</div>
    </div>
  );
}
