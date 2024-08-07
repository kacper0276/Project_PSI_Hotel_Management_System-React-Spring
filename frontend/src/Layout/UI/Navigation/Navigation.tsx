import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import useMainContext from "../../../hooks/useMainContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { actionTypes } from "../../../reducer";
import { useTranslation } from "react-i18next";

const Navigation: React.FC = () => {
  const { state, dispatch } = useMainContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const logOutFunction = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    window.localStorage.removeItem("userstatus");
    dispatch({
      type: actionTypes.LOG_OUT_USER,
    });

    navigate("/");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Hotel Sokół
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                {t("welcome")} Strona główna
              </Link>
            </li>
            {state.userLoggin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logOutFunction}>
                    Wyloguj
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/paneluzytkownika">
                    Twój panel
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/zaloguj">
                  Logowanie
                </Link>
              </li>
            )}
            {state.userStatus === "Administrator" && (
              <li className="nav-item">
                <Link className="nav-link" to="/paneladmina">
                  Panel Administratora
                </Link>
              </li>
            )}
            {(state.userStatus === "Recepcjonista" ||
              state.userStatus === "Administrator") && (
              <li className="nav-item">
                <Link className="nav-link" to="/panelrecepcjonisty">
                  Panel Recepcjonisty
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/*
        //  TODO: ZAIMPLEMENTOWAĆ ŁADNĄ ZMIANĘ JĘZYKÓW  
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('pl')}>Polski</button>
        */}
      </div>
    </nav>
  );
};

export default Navigation;
