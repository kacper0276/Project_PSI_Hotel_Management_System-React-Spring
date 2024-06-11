import styles from "./CheckPayments.module.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { useEffect, useState } from "react";
import PaymentService from "../../../services/Payment.service";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";

export default function CheckPayments() {
  useWebsiteTitle("Sprawdź płatności");
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    setPayments(await PaymentService.getAllPayments());
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <h1>Sprawdź płatności</h1>
      <table className={`${styles.data_table}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Metoda płatności</th>
            <th>Status płatności</th>
            <th>Kwota</th>
            <th>Data płatności</th>
            <th>ID rezerwacji</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, key) => {
            return (
              <tr key={key}>
                <td>{payment.id}</td>
                <td>{payment.metodaPlatnosci}</td>
                <td>{payment.statusPlatnosci}</td>
                <td>{payment.kwota} zł</td>
                <td>
                  {payment.dataPlatnosci
                    ? cutTimeInDateTime(payment.dataPlatnosci)
                    : "Brak płatności"}
                </td>
                <td>{payment.rezerwacje_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
