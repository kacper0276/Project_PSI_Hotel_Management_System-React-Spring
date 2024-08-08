import { useState, ChangeEvent, MouseEvent } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import styles from "./ForgotPassword.module.css";

interface ForgotPasswordProps {
  showForgotPanel: boolean;
  setShowForgotPanel: (show: boolean) => void;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
  useWebsiteTitle("Reset hasła");

  const [email, setEmail] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const sendEmail = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // await axios.post("/api/forgot-password", { email });
      setShowMessage(true);
    } catch (error) {
      console.error("Failed to send reset email:", error);
    }
  };

  return (
    <>
      {props.showForgotPanel && (
        <div className={styles.main_container}>
          <div className={styles.close_icon}>
            <button
              onClick={() => {
                props.setShowForgotPanel(false);
              }}
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <div className={styles.form_div}>
            <p>
              Na poniżej podany email zostanie wysłana wiadomość z linkiem do
              zmiany hasła
            </p>
            <span>Podaj twój adres email: </span>
            <input
              type="email"
              name="email"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <button onClick={sendEmail}>Wyślij wiadomość</button>
            {showMessage && (
              <div className={styles.message_box}>
                <p>Wiadomość wysłana na podany email</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
