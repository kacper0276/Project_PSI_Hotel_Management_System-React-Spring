import axios from "axios";
import { API_URL } from "../App";

export class AuthService {
  static async getAllUsers() {
    const response = await axios.get(`${API_URL}/uzytkownicy`);
    return response.data;
  }

  static async deleteUser(id) {
    await axios.delete(`${API_URL}/uzytkownicy/${id}`);
  }

  static async getUserDetails(id) {
    const response = await axios.get(`${API_URL}/uzytkownicy/szukaj/id/${id}`);

    return response.data;
  }
}
