import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";
import { API_URL } from "../../App";
import MainContext from "../../context/MainContext";

export default function LoginPage() {
  useWebsiteTitle("Zaloguj się");

  const context = useContext(MainContext);
  const navigate = useNavigate();
  const [showForgotPanel, setShowForgotPanel] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const loginFunction = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", loginData.email);
    formData.append("haslo", loginData.password);

    try {
      await axios
        .post(`${API_URL}/uzytkownicy/zaloguj`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.message.includes("Błędny")) {
            setMessage(res.data.message);
          } else {
            let userData = res.data.message.split(" ");
            console.log(userData);
            context.dispatch({
              type: "change-login-status",
              userData: userData,
            });
            setMessage("Zalogowano");
            navigate("/");
          }
        });
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data);
      }
    }
  };

  return (
    <main className={`${styles.main_container}`}>
      <div className={`${styles.back_arrow}`}>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </Link>
      </div>
      <div className={`${styles.div_form}`}>
        <form className={`${styles.login_form}`}>
          <input
            type="email"
            name="login"
            placeholder="Podaj login"
            autoComplete="off"
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Podaj hasło"
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <div className={`${styles.register_link}`}>
            <p>
              Nie masz jeszcze konta?{" "}
              <Link to="/rejestracja">Zarejestruj się</Link>
            </p>
          </div>
          <div
            className={`${styles.forgot_password}`}
            onClick={() => {
              setMessage("");
              setShowForgotPanel(true);
            }}
          >
            <p>Zapomniałeś hasła?</p>
          </div>
          {showForgotPanel ? (
            <ForgotPassword
              setShowForgotPanel={setShowForgotPanel}
              showForgotPanel={showForgotPanel}
            />
          ) : null}
          <button className={`${styles.login_button}`} onClick={loginFunction}>
            Zaloguj się
          </button>
        </form>
        {message ? (
          <div className={`${styles.error_message}`}>{message}</div>
        ) : null}
      </div>
    </main>
  );
}
