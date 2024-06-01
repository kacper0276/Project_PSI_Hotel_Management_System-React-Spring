import { useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./CreateClient.module.css";
import axios from "axios";
import { API_URL } from "../../../App";

export default function CreateClient() {
  useWebsiteTitle("Stwórz klienta");
  const [clientData, setClientData] = useState({
    imie: null,
    nazwisko: null,
    nip: null,
    nazwaFirmy: null,
    rodzaj: null,
    uzytkownik: {
      email: window.localStorage.getItem("email"),
    },
  });

  const createClient = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uzytkownik", clientData.uzytkownik.email);

    if (clientData.rodzaj === "KlientIndywidualny") {
      formData.append("imie", clientData.imie);
      formData.append("nazwisko", clientData.nazwisko);
      await axios
        .post(`${API_URL}/klienci/dodaj-indywidualny`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      formData.append("nip", clientData.nip);
      formData.append("nazwaFirmy", clientData.nazwaFirmy);

      await axios
        .post(`${API_URL}/klienci/dodaj-biznesowy`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className={`${styles.main_container}`}>
      <h2>Stwórz klienta</h2>
      <form className={`${styles.form}`}>
        <input
          type="radio"
          name="typeClient"
          id="KlientIndywidualny"
          value={"KlientIndywidualny"}
          onChange={(e) =>
            setClientData({ ...clientData, rodzaj: e.target.value })
          }
        />
        <label htmlFor="KlientIndywidualny">Klient Indywidualny</label>
        <input
          type="radio"
          name="typeClient"
          id="KlientBizesowy"
          value={"KlientBizesowy"}
          onChange={(e) =>
            setClientData({ ...clientData, rodzaj: e.target.value })
          }
        />
        <label htmlFor="KlientBizesowy">Klient Biznesowy</label>
        {clientData.rodzaj === "KlientBizesowy" ? (
          <>
            <input
              placeholder="Podaj NIP"
              onChange={(e) =>
                setClientData({ ...clientData, nip: e.target.value })
              }
            />
            <input
              placeholder="Podaj nazwę firmy"
              onChange={(e) =>
                setClientData({ ...clientData, nazwaFirmy: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <input
              placeholder="Podaj imię"
              onChange={(e) =>
                setClientData({ ...clientData, imie: e.target.value })
              }
            />
            <input
              placeholder="Podaj nazwisko"
              onChange={(e) =>
                setClientData({ ...clientData, nazwisko: e.target.value })
              }
            />
          </>
        )}
        <button onClick={createClient} className={`${styles.send_button}`}>
          Stwórz klienta
        </button>
      </form>
    </div>
  );
}
