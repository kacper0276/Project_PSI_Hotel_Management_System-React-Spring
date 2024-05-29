import styles from "./AdminMenuNavigation.module.css";
import { Link } from "react-router-dom";

export default function AdminMenuNavigation() {
  return (
    <div className={`${styles.main_container}`}>
      <ul>
        <li>
          <Link>Ustawienia użytkowników</Link>
        </li>
        <li>
          <Link>Ustawienia rezerwacji</Link>
        </li>
      </ul>
    </div>
  );
}
