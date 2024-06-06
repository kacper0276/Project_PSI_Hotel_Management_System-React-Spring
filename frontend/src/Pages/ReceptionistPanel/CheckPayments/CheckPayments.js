import styles from "./CheckPayments.module.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

export default function CheckPayments() {
  useWebsiteTitle("Sprawdź płatności");

  return <div className={`${styles.main_container}`}>Sprawdź płatności</div>;
}
