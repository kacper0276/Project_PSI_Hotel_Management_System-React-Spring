import styles from "./EditUserData.module.css";
import useWebisteTitle from "../../../hooks/useWebsiteTitle";
import { useContext, useEffect, useState } from "react";
import MainContext from "../../../context/MainContext";
import UserService from "../../../services/User.service";

export default function EditUserData() {
  useWebisteTitle("Zmień swoje dane");
  const context = useContext(MainContext);
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
    UserService.findUserByEmail(context.state.username).then((res) => {
      setUserData({
        id: res.id,
        email: res.email,
        password: res.haslo,
        firstPassword: res.haslo,
        rola: res.rola,
      });
    });
  }, []);

  const updateData = (e) => {
    e.preventDefault();

    if (
      userData.second_password === "" ||
      userData.password === userData.second_password ||
      userData.firstPassword === userData.password
    ) {
      UserService.changeUserData(userData).then((res) => {
        setMessage(res);
      });
    } else {
      setMessage("Hasła nie są takie same");
    }
  };

  return (
    <form className={`${styles.main_container}`} method="POST">
      <input
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="text"
        value={userData.password}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
      />
      <input
        type="text"
        onChange={(e) =>
          setUserData({ ...userData, second_password: e.target.value })
        }
      />
      <select
        value={userData.rola}
        onChange={(e) => setUserData({ ...userData, rola: e.target.value })}
      >
        <option value={"Klient"}>Klient</option>
        <option value={"Recepcjonista"}>Recepcjonista</option>
        <option value={"Administrator"}>Administrator</option>
      </select>
      <button className={`${styles.change_data_button}`} onClick={updateData}>
        Zmień dane
      </button>
      {message ? (
        <div
          className={
            message === "Zarejestrowano, sprawdź maila by aktywować konto"
              ? `${styles.good_message}`
              : `${styles.error_message}`
          }
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
