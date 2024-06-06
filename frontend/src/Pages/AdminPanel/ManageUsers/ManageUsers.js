import { useEffect, useState } from "react";
import styles from "./ManageUsers.module.css";
import EditUserDataForm from "../EditUserDataForm/EditUserDataForm";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import UserService from "../../../services/User.service";

export default function ManageUsers() {
  useWebsiteTitle("Zmień dane użytkowników");

  const [uzytkownicy, setUzytkownicy] = useState([]);
  const [daneUzytkownika, setDaneUzytkownika] = useState(null);

  async function fetchUsers() {
    setUzytkownicy(await UserService.getAllUsers());
  }

  async function getUsersDetails(e, id) {
    e.preventDefault();

    setDaneUzytkownika(await UserService.getUserDetails(id));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [daneUzytkownika]);

  const deleteUser = (e, id) => {
    e.preventDefault();

    UserService.deleteUser(id).then(() => {
      fetchUsers();
    });
  };

  return (
    <div className={`${styles.main_container}`}>
      <h2>Zarządzaj użytkownikami</h2>
      <table className={`${styles.user_data_table}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Hasło</th>
            <th>Rola</th>
          </tr>
        </thead>
        <tbody>
          {uzytkownicy.map((uzytkownik, key) => {
            return (
              <tr key={key}>
                <td>{uzytkownik.id}</td>
                <td>{uzytkownik.email}</td>
                <td>{uzytkownik.haslo}</td>
                <td>{uzytkownik.rola}</td>
                <td>
                  <button onClick={(e) => deleteUser(e, uzytkownik.id)}>
                    Usuń
                  </button>
                </td>
                <td>
                  <button onClick={(e) => getUsersDetails(e, uzytkownik.id)}>
                    Edytuj
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {daneUzytkownika != null ? (
        <EditUserDataForm
          data={daneUzytkownika}
          disableView={setDaneUzytkownika}
        />
      ) : null}
    </div>
  );
}
