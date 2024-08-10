import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./ManagePayments.module.css";
import PaymentService from "../../../services/Payment.service";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import { Payment } from "../../../types/payment.types";

export default function ManagePayments() {
  useWebsiteTitle("Zarządzaj płatnościami");

  const [payments, setPayments] = useState<Payment[]>([]);

  async function fetchPayments() {
    try {
      const fetchedPayments = await PaymentService.getAllPayments();
      setPayments(fetchedPayments);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className={styles.main_container}>
      <h1>Zarządzaj płatnościami</h1>
      <table className={styles.data_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Metoda płatności</th>
            <th>Status płatności</th>
            <th>Kwota</th>
            <th>Data płatności</th>
            <th>ID rezerwacji</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
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
              <td>
                <button>Edytuj dane</button>
                <button>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
