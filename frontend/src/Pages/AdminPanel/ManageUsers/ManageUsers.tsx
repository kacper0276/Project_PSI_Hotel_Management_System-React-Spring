import { useEffect, useState, MouseEvent } from "react";
import styles from "./ManageUsers.module.css";
import EditUserDataForm from "../EditUserDataForm/EditUserDataForm";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import UserService from "../../../services/User.service";

interface User {
  id: number;
  email: string;
  haslo: string;
  rola: string;
}

interface UserDetails extends User {}

export default function ManageUsers() {
  useWebsiteTitle("Zmień dane użytkowników");

  const [uzytkownicy, setUzytkownicy] = useState<User[]>([]);
  const [daneUzytkownika, setDaneUzytkownika] = useState<UserDetails | null>(
    null
  );

  async function fetchUsers() {
    try {
      const users = await UserService.getAllUsers();
      setUzytkownicy(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  async function getUsersDetails(e: MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();

    try {
      const userDetails = await UserService.getUserDetails(id);
      setDaneUzytkownika(userDetails);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }

  const deleteUser = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();

    try {
      await UserService.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.main_container}>
      <h2>Zarządzaj użytkownikami</h2>
      <table className={styles.user_data_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Hasło</th>
            <th>Rola</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {uzytkownicy.map((uzytkownik) => (
            <tr key={uzytkownik.id}>
              <td>{uzytkownik.id}</td>
              <td>{uzytkownik.email}</td>
              <td>{uzytkownik.haslo}</td>
              <td>{uzytkownik.rola}</td>
              <td>
                <button onClick={(e) => deleteUser(e, uzytkownik.id)}>
                  Usuń
                </button>
                <button onClick={(e) => getUsersDetails(e, uzytkownik.id)}>
                  Edytuj
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {daneUzytkownika && (
        <EditUserDataForm
          data={daneUzytkownika}
          disableView={() => setDaneUzytkownika(null)}
        />
      )}
    </div>
  );
}
