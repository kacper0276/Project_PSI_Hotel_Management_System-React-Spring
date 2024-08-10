import styles from "./CheckPayments.module.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { useEffect, useState } from "react";
import PaymentService from "../../../services/Payment.service";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import { Payment } from "../../../types/payment.types";

export default function CheckPayments() {
  useWebsiteTitle("Sprawdź płatności");

  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPayments = async () => {
    try {
      const data = await PaymentService.getAllPayments();
      setPayments(data);
    } catch (err) {
      setError("Failed to fetch payments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.main_container}`}>
      <h1>Sprawdź płatności</h1>
      {error && <div className="error-message">{error}</div>}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
