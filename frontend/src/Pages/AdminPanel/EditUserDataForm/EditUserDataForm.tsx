import { useEffect, useState } from "react";
import styles from "./EditUserDataForm.module.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import UserService from "../../../services/User.service";
import { User, UserState } from "../../../types/user.types";

interface EditUserDataFormProps {
  data: User;
  disableView: (view: any) => void;
}

export default function EditUserDataForm(props: EditUserDataFormProps) {
  useWebsiteTitle(`Zmień dane: ${props.data.email}`);

  const [message, setMessage] = useState<string>("");
  const [userData, setUserData] = useState<UserState>({
    id: 0,
    email: "",
    password: "",
    second_password: "",
    rola: "",
    firstPassword: "",
  });

  useEffect(() => {
    setUserData({
      id: props.data.id,
      email: props.data.email,
      password: props.data.haslo,
      second_password: "",
      rola: props.data.rola,
      firstPassword: props.data.haslo,
    });
  }, [props.data]);

  const updateData = (e: React.FormEvent<HTMLFormElement>) => {
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
    <form className={styles.main_container} method="POST" onSubmit={updateData}>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.disableView(null);
          }}
        >
          Zamknij
        </button>
      </div>
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
        value={userData.second_password}
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
      <button className={styles.change_data_button} type="submit">
        Zmień dane
      </button>
      {message && (
        <div
          className={
            message === "Zarejestrowano, sprawdź maila by aktywować konto"
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
