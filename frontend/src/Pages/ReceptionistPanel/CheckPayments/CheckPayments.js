import styles from "./CheckPayments.module.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { useEffect, useState } from "react";
import PaymentService from "../../../services/Payment.service";

export default function CheckPayments() {
  useWebsiteTitle("Sprawdź płatności");
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    setPayments(await PaymentService.getAllPayments());
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return <div className={`${styles.main_container}`}>Sprawdź płatności</div>;
}
