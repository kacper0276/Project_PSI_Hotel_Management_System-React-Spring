import React from "react";
import styles from "./LoadingIcon.module.css";

const LoadingIcon: React.FC = () => {
  return (
    <>
      <div
        className={`d-flex justify-content-center ${styles.loadingBackground}`}
      >
        <div className={`spinner-border m-5 text-primary`} role="status">
          <span className={`sr-only ${styles.loadingText}`}>Ładowanie...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingIcon;
