import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import { actionTypes } from "../../../reducer";
import useMainContext from "../../../hooks/useMainContext";

const Old: React.FC = () => {
  const context = useMainContext();
  const navigate = useNavigate();
  const buttonMobile = useRef<HTMLDivElement>(null);
  const navigationList = useRef<HTMLUListElement>(null);

  const showMenu = () => {
    if (buttonMobile.current && navigationList.current) {
      buttonMobile.current.classList.toggle(`${styles.active}`);
      navigationList.current.classList.toggle(`${styles.active}`);
    }
  };

  const logOutFunction = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    window.localStorage.removeItem("userstatus");
    context.dispatch({
      type: actionTypes.LOG_OUT_USER,
    });

    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <nav className={styles.navigation}>
      <div
        className={styles.button_mobile}
        ref={buttonMobile}
        onClick={showMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={styles.navigation_list} ref={navigationList}>
        <li className={styles.navigation_element}>
          <Link to="/" className={styles.navigation_link}>
            Strona główna
          </Link>
        </li>
        {context.state.userLoggin ? (
          <>
            <li className={styles.navigation_element}>
              <Link
                className={styles.navigation_link}
                to={"/"}
                onClick={logOutFunction}
              >
                Wyloguj
              </Link>
            </li>
            <li className={styles.navigation_element}>
              <Link to="/paneluzytkownika" className={styles.navigation_link}>
                Twój panel
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.navigation_element}>
            <Link to="/zaloguj" className={styles.navigation_link}>
              Logowanie
            </Link>
          </li>
        )}
        {context.state.userStatus === "Administrator" && (
          <li className={styles.navigation_element}>
            <Link to="/paneladmina" className={styles.navigation_link}>
              Panel Administratora
            </Link>
          </li>
        )}
        {(context.state.userStatus === "Recepcjonista" ||
          context.state.userStatus === "Administrator") && (
          <li className={styles.navigation_element}>
            <Link to="/panelrecepcjonisty" className={styles.navigation_link}>
              Panel Recepcjonisty
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Old;
