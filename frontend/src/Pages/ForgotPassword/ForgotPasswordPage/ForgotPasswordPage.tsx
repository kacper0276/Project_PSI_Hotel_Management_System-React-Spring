import axios from "axios";
import { useRef, useState, FormEvent, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./ForgotPasswordPage.module.css";

interface ChangePasswordData {
  email: string;
  password: string;
  second_password: string;
}

export default function ForgotPasswordPage() {
  useWebsiteTitle("Zresetuj hasło");
  const params = useParams<{ username?: string }>();
  const navigate = useNavigate();

  const [changePasswordData, setChangePasswordData] =
    useState<ChangePasswordData>({
      email: params.username || "",
      password: "",
      second_password: "",
    });
  const [message, setMessage] = useState<string>("");

  const password1 = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);
  const img1 = useRef<HTMLImageElement>(null);
  const img2 = useRef<HTMLImageElement>(null);

  const showPassword = (e: MouseEvent<HTMLButtonElement>, number: number) => {
    e.preventDefault();

    const passwordRef = number === 1 ? password1.current : password2.current;
    const imgRef = number === 1 ? img1.current : img2.current;

    if (passwordRef && imgRef) {
      if (imgRef.src.includes("show_password_off")) {
        passwordRef.type = "text";
        imgRef.src = "../imgUseOnPage/show_password_on.jpg";
        imgRef.alt = "Show password on";
      } else {
        passwordRef.type = "password";
        imgRef.src = "../imgUseOnPage/show_password_off.png";
        imgRef.alt = "Show password off";
      }
    }
  };

  const changePasswordFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/change-password", changePasswordData);
      setMessage("Hasło zostało zmienione pomyślnie.");
      navigate("/login");
    } catch (error) {
      console.error("Failed to change password:", error);
      setMessage("Wystąpił błąd podczas zmiany hasła.");
    }
  };

  return (
    <div className={styles.main_container}>
      <p>
        Reset hasła użytkownika: <b>{params.username}</b>
      </p>
      <form
        method="POST"
        className={styles.form_style}
        onSubmit={changePasswordFunction}
      >
        <div className={styles.password_div}>
          <input
            type="password"
            name="password"
            placeholder=" "
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
                password: e.target.value,
              })
            }
            ref={password1}
          />
          <span>Nowe hasło</span>
          <button
            className={styles.show_password}
            onClick={(e) => showPassword(e, 1)}
          >
            <img
              src="../imgUseOnPage/show_password_off.png"
              alt="Show password off"
              ref={img1}
            />
          </button>
        </div>
        <div className={styles.password_div}>
          <input
            type="password"
            name="second_password"
            placeholder=" "
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
                second_password: e.target.value,
              })
            }
            ref={password2}
          />
          <span>Powtórz nowe hasło</span>
          <button
            className={styles.show_password}
            onClick={(e) => showPassword(e, 2)}
          >
            <img
              src="../imgUseOnPage/show_password_off.png"
              alt="Show password off"
              ref={img2}
            />
          </button>
        </div>

        <button type="submit" className={styles.send_button}>
          Zatwierdź zmianę hasła
        </button>
        {message && <div className={styles.error_message}>{message}</div>}
      </form>
    </div>
  );
}
