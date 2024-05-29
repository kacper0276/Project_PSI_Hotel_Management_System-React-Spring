import { useState } from "react";
import AdminMenuNavigation from "../../Layout/partials/AdminMenuNavigation/AdminMenuNavigation";
import styles from "./AdminPanel.module.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function AdminPanel() {
  useWebsiteTitle("Panel administratora");

  const [selectedPanel, setSelectedPanel] = useState(
    <h1>Panel administratora</h1>
  );

  const getActualPanel = (panel) => {
    setSelectedPanel(panel);
  };

  return (
    <div className={`${styles.main_container}`}>
      <AdminMenuNavigation panel={getActualPanel} />
      <div className={`${styles.container}`}>{selectedPanel}</div>
    </div>
  );
}
