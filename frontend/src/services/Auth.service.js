import axios from "axios";
import { API_URL } from "../App";

export class AuthService {
  static async getAllUsers() {
    await axios.get(`${API_URL}/uzytkownicy`).then((res) => {
      return res.data;
    });
  }
}
