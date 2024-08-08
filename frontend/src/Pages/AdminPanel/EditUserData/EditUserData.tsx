import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import styles from "./EditUserData.module.css";
import useMainContext from "../../../hooks/useMainContext";
import UserService from "../../../services/User.service";

export default function EditUserData() {
  useWebsiteTitle("Zmień swoje dane");

  const { state } = useMainContext();

  const [userData, setUserData] = useState({
    id: 0,
    email: "",
    password: "",
    second_password: "",
    rola: "",
    firstPassword: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    UserService.findUserByEmail(state.username).then((res) => {
      setUserData({
        id: res.id ?? 0,
        email: res.email ?? "",
        password: res.haslo ?? "",
        second_password: "",
        rola: res.rola ?? "",
        firstPassword: res.haslo ?? "",
      });
    });
  }, [state.username]);

  const updateData = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      userData.second_password === "" ||
      userData.password === userData.second_password ||
      userData.firstPassword === userData.password
    ) {
      UserService.changeUserData(userData).then(() => {
        setMessage("Dane zostały zaktualizowane");
      });
    } else {
      setMessage("Hasła nie są takie same");
    }
  };

  return (
    <form className={styles.main_container} method="POST">
      <input
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        value={userData.password}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Powtórz nowe hasło"
        onChange={(e) =>
          setUserData({ ...userData, second_password: e.target.value })
        }
      />
      <select
        value={userData.rola}
        onChange={(e) => setUserData({ ...userData, rola: e.target.value })}
      >
        <option value="Klient">Klient</option>
        <option value="Recepcjonista">Recepcjonista</option>
        <option value="Administrator">Administrator</option>
      </select>
      <button className={styles.change_data_button} onClick={updateData}>
        Zmień dane
      </button>
      {message && (
        <div
          className={
            message === "Dane zostały zaktualizowane"
              ? styles.good_message
              : styles.error_message
          }
        >
          {message}
        </div>
      )}
    </form>
  );
}
