import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import MainContext from "../../../context/MainContext";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Navigation() {
  const context = useContext(MainContext);
  const navigate = useNavigate();

  const logOutFunction = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("userstatus");
    context.dispatch({
      type: "log-out-user",
    });

    navigate("/");
  };

  useEffect(() => {}, []);

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
                Strona główna
              </Link>
            </li>
            {context.state.userLoggin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" onClick={(e) => logOutFunction(e)}>
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
            {context.state.userStatus === "Administrator" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/paneladmina">
                  Panel Administratora
                </Link>
              </li>
            ) : null}
            {context.state.userStatus === "Recepcjonista" ||
            context.state.userStatus === "Administrator" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/panelrecepcjonisty">
                  Panel Recepcjonisty
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
