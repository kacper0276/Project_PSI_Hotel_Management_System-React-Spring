import { useParams } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./PaymentPage.module.css";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  useWebsiteTitle("Dokonaj płatności");
  const { idRes } = useParams();
  const [paymentData, setPaymentData] = useState({
    metodaPlatnosci: "",
    status: "Złożone",
  });

  const payForReservation = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(idRes);
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <h2>
        Dokonaj płatności za rezerwację o id <strong>{idRes}</strong>
      </h2>
      <form>
        <p>Wybierz opcję płatności</p>
        <div className={`${styles.option}`}>
          <label htmlFor="cash">Gotówka</label>
          <input type="radio" name="paymentType" id="cash" />
        </div>
        <div className={`${styles.option}`}>
          <label htmlFor="blik">Blik</label>
          <input type="radio" name="paymentType" id="blik" />
        </div>
        <div className={`${styles.option}`}>
          <label htmlFor="transfer">Przelew</label>
          <input type="radio" name="paymentType" id="transfer" />
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
