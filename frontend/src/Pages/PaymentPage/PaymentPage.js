import { useNavigate, useParams } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./PaymentPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";

export default function PaymentPage() {
  useWebsiteTitle("Dokonaj płatności");
  const navigate = useNavigate();

  const { idRes } = useParams();
  const [paymentData, setPaymentData] = useState({
    metodaPlatnosci: "",
    status: "Złożone",
    kwota: 0,
  });

  useEffect(() => {
    axios.get(`${API_URL}/rezerwacje/${idRes}`).then((res) => {
      setPaymentData({ ...paymentData, kwota: res.data.cena });
    });
  }, []);

  const payForReservation = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(paymentData).forEach((key) => {
      formData.append(key, paymentData[key]);
    });

    await axios
      .post(`${API_URL}/platnosci`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        axios
          .patch(`${API_URL}/rezerwacje/platnosc/${idRes}`, res.data.message, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            navigate("/");
          });
      });
  };

  return (
    <div className={`${styles.main_container}`}>
      <h2>
        Dokonaj płatności za rezerwację o id <strong>{idRes}</strong>
      </h2>
      <form>
        <p>Wybierz opcję płatności</p>
        <div className={`${styles.option}`}>
          <label htmlFor="cash">Gotówka</label>
          <input
            type="radio"
            name="paymentType"
            id="cash"
            value={"cash"}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                metodaPlatnosci: e.target.value,
              })
            }
          />
        </div>
        <div className={`${styles.option}`}>
          <label htmlFor="blik">Blik</label>
          <input
            type="radio"
            name="paymentType"
            id="blik"
            value={"blik"}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                metodaPlatnosci: e.target.value,
              })
            }
          />
        </div>
        <div className={`${styles.option}`}>
          <label htmlFor="transfer">Przelew</label>
          <input
            type="radio"
            name="paymentType"
            id="transfer"
            value={"transfer"}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                metodaPlatnosci: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={payForReservation}
          className={`${styles.button_style}`}
        >
          Przekierowanie na stronę płatniczą
        </button>
      </form>
    </div>
  );
}
