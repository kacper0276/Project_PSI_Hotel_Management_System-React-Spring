import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./LoginPage.module.css";
import "./LoginPage.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { API_URL } from "../../App";
import MainContext from "../../context/MainContext";
import Navigation from "../../Layout/UI/Navigation/Navigation";

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
            context.dispatch({
              type: "change-login-status",
              userData: res.data.message,
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
      <Navigation />
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
        <section className="text-center text-lg-start ">
          <div className="card mb-3 bg-light text-white">
            <div className="row g-0 d-flex">
              <div className="col-lg-4 d-none d-lg-flex ">
                <img
                  src="https://i.pinimg.com/564x/e4/f4/65/e4f4650dc48b400b42eb074f91c75918.jpg"
                  alt="Hotel Picture"
                  className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 object-fit-fill rounded"
                  class="forestPicture"
                />
              </div>
              <div className="col-lg-8">
                <div className="card-body py-5 px-md-5">
                  <form>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example1"
                        className="form-control"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                      />
                      <label className="form-label" htmlFor="form2Example1">
                        Adres Email
                      </label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                      <label className="form-label" htmlFor="form2Example2">
                        Hasło
                      </label>
                    </div>
                    <div className="row mb-4">
                      <div className="col d-flex justify-content-center text-dark">
                        <div className={`${styles.register_link}`}>
                          <p>
                            Nie masz jeszcze konta?{" "}
                            <Link to="/rejestracja">Zarejestruj się</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col text-white text-center">
                        <a href="#!" onClick={() => setShowForgotPanel(true)}>
                          Zapomniałeś hasła?
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-block mb-4 btn-dark"
                      onClick={loginFunction}
                    >
                      Zaloguj się
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showForgotPanel ? (
        <ForgotPassword
          setShowForgotPanel={setShowForgotPanel}
          showForgotPanel={showForgotPanel}
        />
      ) : null}
      {message ? (
        <div className={`${styles.error_message}`}>{message}</div>
      ) : null}
    </main>
  );
}
