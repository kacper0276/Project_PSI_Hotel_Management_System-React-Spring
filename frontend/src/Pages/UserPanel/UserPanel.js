import styles from "./UserPanel.module.css";
import { useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import UserMenuNavigation from "../../Layout/partials/UserMenuNavigation/UserMenuNavigation";

export default function UserPanel() {
  useWebsiteTitle("Panel użytkownika");

  const [selectedPanel, setSelectedPanel] = useState(
    <h1>Panel użytkownika</h1>
  );

  const getActualPanel = (panel) => {
    setSelectedPanel(panel);
  };

  return (
    <div className={`${styles.main_container}`}>
      <UserMenuNavigation panel={getActualPanel} />
      <div className={`${styles.container}`}>{selectedPanel}</div>
    </div>
  );
}
