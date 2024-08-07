import { useNavigate, useParams } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./PaymentPage.module.css";
import { useEffect, useState } from "react";
import PaymentService from "../../services/Payment.service";
import ReservationService from "../../services/Reservation.service";

interface PaymentData {
  metodaPlatnosci: string;
  status: string;
  kwota: number;
}

export default function PaymentPage() {
  useWebsiteTitle("Dokonaj płatności");
  const navigate = useNavigate();

  const { idRes } = useParams();

  const [paymentData, setPaymentData] = useState<PaymentData>({
    metodaPlatnosci: "",
    status: "Złożone",
    kwota: 0,
  });

  useEffect(() => {
    if (idRes) {
      ReservationService.getPaymentData(idRes).then((res) => {
        setPaymentData({
          ...paymentData,
          kwota: res,
        });
      });
    }
  }, [idRes]);

  const payForReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idRes) {
      await PaymentService.createPayment(paymentData).then((res) => {
        ReservationService.updatePaymentInReservation(idRes, res).then(() => {
          navigate("/");
        });
      });
    }
  };

  return (
    <div className={`${styles.main_container}`}>
      <h2>
        Dokonaj płatności za rezerwację o id <strong>{idRes}</strong>
      </h2>
      <form onSubmit={payForReservation}>
        <p>Wybierz opcję płatności</p>
        <div className={`${styles.option}`}>
          <label htmlFor="cash">Gotówka</label>
          <input
            type="radio"
            name="paymentType"
            id="cash"
            value="cash"
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
            value="Blik"
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
            value="Transfer"
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                metodaPlatnosci: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className={`${styles.button_style}`}>
          Przekierowanie na stronę płatniczą
        </button>
      </form>
    </div>
  );
}
