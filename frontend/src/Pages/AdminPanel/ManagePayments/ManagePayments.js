import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./ManagePayments.module.css";

export default function ManagePayments() {
  useWebsiteTitle("Zarządzaj płatnościami");

  return (
    <div className={`${styles.main_container}`}>Zarządzaj płatnościami</div>
  );
}
