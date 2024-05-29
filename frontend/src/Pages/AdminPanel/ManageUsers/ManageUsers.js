import { useEffect, useState } from "react";
import styles from "./ManageUsers.module.css";
import axios from "axios";
import { API_URL } from "../../../App";

export default function ManageUsers() {
  const [uzytkownicy, setUzytkownicy] = useState([]);

  async function fetchUsers() {
    axios.get(`${API_URL}/uzytkownicy`).then((res) => {
      setUzytkownicy(res.data);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

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
                  <button>Edytuj</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
