// import { useState, ReactNode } from "react";
import AdminMenuNavigation from "../../Layout/partials/AdminMenuNavigation/AdminMenuNavigation";
import styles from "./AdminPanel.module.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function AdminPanel() {
  useWebsiteTitle("Panel administratora");

  // const [selectedPanel, setSelectedPanel] = useState<ReactNode>(
  //   <h1>Panel administratora</h1>
  // );

  // const getActualPanel = (panel: ReactNode) => {
  //   setSelectedPanel(panel);
  // };

  return (
    <div className={`${styles.main_container}`}>
      <AdminMenuNavigation />
      {/* panel={getActualPanel} */}
    </div>
  );
}
