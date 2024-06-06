import axios from "axios";
import { API_URL } from "../App";

export default class ReservationService {
  static async getAllReservations() {
    const response = await axios.get(`${API_URL}/rezerwacje`);

    return response.data;
  }

  static async deleteReservation(id) {
    await axios.delete(`${API_URL}/rezerwacje/${id}`);
  }

  static async bookClient(id) {
    await axios.patch(`${API_URL}/rezerwacje/zameldowanie/${id}`);
  }
}
