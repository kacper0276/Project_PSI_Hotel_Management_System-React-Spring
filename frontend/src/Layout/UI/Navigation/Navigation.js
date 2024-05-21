import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import axios from "axios";

export default function Navigation() {
  const navigate = useNavigate();
  const buttonMobile = useRef();
  const navigationList = useRef();

  const showMenu = () => {
    buttonMobile.current.classList.toggle(`${styles.active}`);
    navigationList.current.classList.toggle(`${styles.active}`);
  };

  const logOutFunction = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <nav className={`${styles.navigation}`}>
      <div
        className={`${styles.button_mobile}`}
        ref={buttonMobile}
        onClick={showMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.navigation_list}`} ref={navigationList}>
        <li className={`${styles.navigation_element}`}>
          <Link to="/" className={`${styles.navigation_link}`}>
            Strona główna
          </Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <Link
            className={`${styles.navigation_link}`}
            onClick={(e) => {
              logOutFunction(e);
            }}
          >
            Wyloguj
          </Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <Link
            to={"/paneluzytkownika"}
            className={`${styles.navigation_link}`}
          >
            Twój panel
          </Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <Link to="/zaloguj" className={`${styles.navigation_link}`}>
            Logowanie
          </Link>
        </li>
      </ul>
    </nav>
  );
}
