import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import "./RegisterPage.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "axios";
import { API_URL } from "../../App";
import { handleChange } from "../../helpers/ProgressBarRegister";
// import MainContext from "../../context/MainContext";

interface RegisterData {
  email: string;
  password: string;
  second_password: string;
  rola: string;
}

interface ClientData {
  imie: string | null;
  nazwisko: string | null;
  nip: string | null;
  nazwaFirmy: string | null;
  rodzaj: string;
  uzytkownik: {
    email: string;
  };
}

export default function RegisterPage() {
  useWebsiteTitle("Zarejestruj się");
  const navigate = useNavigate();
  // const context = useContext(MainContext);

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    second_password: "",
    rola: "Klient",
  });
  const [clientData, setClientData] = useState<ClientData>({
    imie: null,
    nazwisko: null,
    nip: null,
    nazwaFirmy: null,
    rodzaj: "KlientIndywidualny",
    uzytkownik: {
      email: registerData.email,
    },
  });
  const [message, setMessage] = useState<string>("");
  const [showClientForm, setShowClientForm] = useState<boolean>(false);
  const bars = useRef<HTMLDivElement>(null);
  const strengthDiv = useRef<HTMLDivElement>(null);

  const registerFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showClientForm) {
      if (registerData.password === registerData.second_password) {
        const formData = new FormData();

        formData.append("email", registerData.email);
        formData.append("haslo", registerData.password);
        formData.append("rola", registerData.rola);

        await axios
          .post(`${API_URL}/uzytkownicy`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            const formData = new FormData();
            formData.append("uzytkownik", registerData.email);

            if (clientData.rodzaj === "KlientIndywidualny") {
              formData.append("imie", clientData.imie || "");
              formData.append("nazwisko", clientData.nazwisko || "");
              axios
                .post(`${API_URL}/klienci/dodaj-indywidualny`, formData, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  setTimeout(() => {
                    if (response.status === 200) {
                      navigate("/");
                    }
                  }, 2000);
                });
            } else {
              formData.append("nip", clientData.nip || "");
              formData.append("nazwaFirmy", clientData.nazwaFirmy || "");

              axios
                .post(`${API_URL}/klienci/dodaj-biznesowy`, formData, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  setTimeout(() => {
                    if (response.status === 200) {
                      navigate("/");
                    }
                  }, 2000);
                });
            }
          });
      } else {
        setMessage("Hasła nie są takie same!");
      }
    } else {
      setShowClientForm(true);
    }
  };

  const hideMessage = () => {
    setMessage("");
  };

  return (
    <main className={`${styles.main_container}`}>
      <div className={`${styles.div_form}`}>
        <section className="text-center text-lg-start">
          <div className="container py-4">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div
                  className="card cascading-right bg-body-tertiary"
                  style={{ backdropFilter: "blur(30px)" }}
                >
                  {showClientForm ? (
                    <div className="card-body p-5 shadow-5 text-center">
                      <h2 className="fw-bold mb-5">Zarejestruj się</h2>
                      <form
                        onSubmit={registerFunction}
                        className="d-flex flex-column gap-3"
                      >
                        <input
                          type="radio"
                          name="typeClient"
                          id="KlientIndywidualny"
                          defaultChecked
                          value={"KlientIndywidualny"}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              rodzaj: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="KlientIndywidualny">
                          Klient Indywidualny
                        </label>
                        <input
                          type="radio"
                          name="typeClient"
                          id="KlientBizesowy"
                          value={"KlientBizesowy"}
                          onChange={(e) =>
                            setClientData({
                              ...clientData,
                              rodzaj: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="KlientBizesowy">Klient Biznesowy</label>
                        {clientData.rodzaj === "KlientBizesowy" ? (
                          <>
                            <input
                              placeholder="Podaj NIP"
                              onChange={(e) =>
                                setClientData({
                                  ...clientData,
                                  nip: e.target.value,
                                })
                              }
                            />
                            <input
                              placeholder="Podaj nazwę firmy"
                              onChange={(e) =>
                                setClientData({
                                  ...clientData,
                                  nazwaFirmy: e.target.value,
                                })
                              }
                            />
                          </>
                        ) : (
                          <>
                            <input
                              placeholder="Podaj imię"
                              onChange={(e) =>
                                setClientData({
                                  ...clientData,
                                  imie: e.target.value,
                                })
                              }
                            />
                            <input
                              placeholder="Podaj nazwisko"
                              onChange={(e) =>
                                setClientData({
                                  ...clientData,
                                  nazwisko: e.target.value,
                                })
                              }
                            />
                          </>
                        )}

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
                  ) : (
                    <div className="card-body p-5 shadow-5 text-center">
                      <h2 className="fw-bold mb-5">Zarejestruj się</h2>
                      <form onSubmit={registerFunction}>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="email"
                            id="form3Example3"
                            className="form-control"
                            value={registerData.email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
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
                            minLength={8}
                            type="password"
                            id="form3Example4"
                            className="form-control"
                            value={registerData.password}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
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
                            minLength={8}
                            type="password"
                            id="form3Example5"
                            className="form-control"
                            value={registerData.second_password}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
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
                          Przejdź dalej
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
                  )}
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
