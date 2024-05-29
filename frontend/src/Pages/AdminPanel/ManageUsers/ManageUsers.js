import { useEffect, useState } from "react";
import styles from "./ManageUsers.module.css";
import axios from "axios";
import { API_URL } from "../../../App";
import EditUserDataForm from "../EditUserDataForm/EditUserDataForm";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

export default function ManageUsers() {
  useWebsiteTitle("Zmień dane użytkowników");

  const [uzytkownicy, setUzytkownicy] = useState([]);
  const [daneUzytkownika, setDaneUzytkownika] = useState(null);

  async function fetchUsers() {
    await axios.get(`${API_URL}/uzytkownicy`).then((res) => {
      setUzytkownicy(res.data);
    });
  }

  async function getUsersDetails(e, id) {
    e.preventDefault();

    await axios.get(`${API_URL}/uzytkownicy/szukaj/id/${id}`).then((res) => {
      console.log(res);
      setDaneUzytkownika(res.data);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [daneUzytkownika]);

  const deleteUser = (e, id) => {
    e.preventDefault();

    axios.delete(`${API_URL}/uzytkownicy/${id}`).then((res) => {
      console.log(res);
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
