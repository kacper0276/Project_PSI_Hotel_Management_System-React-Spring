import styles from "./MainPage.module.css"
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

export default function MainPage() {
useWebsiteTitle("Strona główna");

return (
    <main className={`${styles.main_container}`}>
      <p>Strona główna</p>
    </main>
  );
}