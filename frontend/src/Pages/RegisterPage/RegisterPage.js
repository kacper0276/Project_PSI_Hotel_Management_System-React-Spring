import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import "./RegisterPage.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "axios";
import { API_URL } from "../../App";
import { handleChange } from "../../helpers/ProgressBarRegister";
import Navigation from "../../Layout/UI/Navigation/Navigation";

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

    console.log(
      `DATA: ${registerData.email} ${registerData.password} ${registerData.second_password}`
    );

    if (registerData.password === registerData.second_password) {
      const formData = new FormData();

      formData.append("email", registerData.email);
      formData.append("haslo", registerData.password);
      formData.append("rola", registerData.rola);

      try {
        const response = await axios.post(`${API_URL}/uzytkownicy`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response);

        setMessage(response.data.message);

        setTimeout(() => {
          if (response.status === 200) {
            navigate("/");
          }
        }, 2000);
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

  const hideMessage = () => {
    setMessage("");
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
        <section className="text-center text-lg-start">
          <div className="container py-4">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div
                  className="card cascading-right bg-body-tertiary"
                  style={{ backdropFilter: "blur(30px)" }}
                >
                  <div className="card-body p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Zarejestruj się</h2>
                    <form onSubmit={registerFunction}>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          className="form-control"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                        />
                        <label className="form-label" htmlFor="form3Example3">
                          Adres Email
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          minLength="8"
                          type="password"
                          id="form3Example4"
                          className="form-control"
                          value={registerData.password}
                          onChange={(e) => {
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            });
                            handleChange(e.target.value, bars, strengthDiv);
                          }}
                        />
                        <label className="form-label" htmlFor="form3Example4">
                          Hasło
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          minLength="8"
                          type="password"
                          id="form3Example5"
                          className="form-control"
                          value={registerData.second_password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              second_password: e.target.value,
                            })
                          }
                        />
                        <label className="form-label" htmlFor="form3Example5">
                          Powtórz Hasło
                        </label>
                      </div>

                      <div id={`${styles.bars}`} ref={bars}>
                        <div></div>
                      </div>
                      <div
                        className={`${styles.strength}`}
                        ref={strengthDiv}
                      ></div>

                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block mb-4"
                      >
                        Zarejestruj się
                      </button>

                      {message && (
                        <div
                          className={
                            message ===
                            "Zarejestrowano, sprawdź maila by aktywować konto"
                              ? `${styles.good_message}`
                              : `${styles.error_message}`
                          }
                          onClick={hideMessage}
                        >
                          {message}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <img
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-100 rounded-4 shadow-4 imageReg"
                  alt="Hotel Photo"
                  height="600rem"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
