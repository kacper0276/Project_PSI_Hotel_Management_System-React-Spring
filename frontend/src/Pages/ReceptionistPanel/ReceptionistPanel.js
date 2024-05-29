import styles from "./ReceptionistPanel.module.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { useState } from "react";
import UserMenuNavigation from "../../Layout/partials/UserMenuNavigation/UserMenuNavigation";

export default function ReceptionistPanel() {
  useWebsiteTitle("Panel Recepcjonisty");

  const [selectedPanel, setSelectedPanel] = useState(
    <h1>Panel recepcjonisty</h1>
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
