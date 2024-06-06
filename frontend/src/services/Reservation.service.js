import { api } from "../api";

export default class ReservationService {
  static async getAllReservations() {
    const response = await api.get(`/rezerwacje`);

    return response.data;
  }

  static async deleteReservation(id) {
    await api.delete(`/rezerwacje/${id}`);
  }

  static async bookClient(id) {
    await api.patch(`/rezerwacje/zameldowanie/${id}`);
  }
}
