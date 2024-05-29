import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "axios";
import { API_URL } from "../../App";
import { handleChange } from "../../helpers/progressBarRegister";

export default function RegisterPage() {
  useWebsiteTitle("Zarejestruj się");
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    second_password: "",
    rola: "Klient",
  });
  const [message, setMessage] = useState("");
  const bars = useRef(),
    strengthDiv = useRef();

  const registerFunction = async (e) => {
    e.preventDefault();

    if (registerData.password === registerData.second_password) {
      const formData = new FormData();

      formData.append("email", registerData.email);
      formData.append("haslo", registerData.password);
      formData.append("rola", registerData.rola);

      try {
        await axios
          .post(`${API_URL}/uzytkownicy`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            setMessage(res.data.message);

            setTimeout(() => {
              navigate("/");
            }, 2000);
          });
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data);
        } else {
          setMessage("Coś poszło nie tak!");
        }
      }
    } else {
      setMessage("Hasła nie są takie same!");
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
        <form className={`${styles.register_form}`}>
          <input
            type="email"
            name="login"
            placeholder="Podaj login"
            autoComplete="off"
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Podaj hasło"
            onChange={(e) => {
              setRegisterData({ ...registerData, password: e.target.value });
            }}
            onKeyDown={(e) => handleChange(e.target.value, bars, strengthDiv)}
          />
          <input
            type="password"
            name="password2"
            placeholder="Powtórz hasło"
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                second_password: e.target.value,
              });
            }}
          />
          <div id={`${styles.bars}`} ref={bars}>
            <div></div>
          </div>
          <div className={`${styles.strength}`} ref={strengthDiv}></div>
          <button
            className={`${styles.register_button}`}
            onClick={registerFunction}
          >
            Zarejestruj się
          </button>
        </form>
        {message ? (
          <div
            className={
              message === "Zarejestrowano, sprawdź maila by aktywować konto"
                ? `${styles.good_message}`
                : `${styles.error_message}`
            }
          >
            {message}
          </div>
        ) : null}
      </div>
    </main>
  );
}
