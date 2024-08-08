import styles from "./ReceptionistPanel.module.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
// import { useState } from "react";
import ReceptionistMenuNavigation from "../../Layout/partials/ReceptionistMenuNavigation/ReceptionistMenuNavigation";

export default function ReceptionistPanel() {
  useWebsiteTitle("Panel Recepcjonisty");

  // const [selectedPanel, setSelectedPanel] = useState(
  //   <h1>Panel recepcjonisty</h1>
  // );

  // const getActualPanel = (panel) => {
  //   setSelectedPanel(panel);
  // };

  return (
    <div className={`${styles.main_container}`}>
      <ReceptionistMenuNavigation />
    </div>
  );
}
