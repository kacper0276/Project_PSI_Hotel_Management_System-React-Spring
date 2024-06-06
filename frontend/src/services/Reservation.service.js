import { api, apiJson } from "../api";

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

  static async updatePaymentInReservation(idRes, message) {
    await apiJson.patch(`/rezerwacje/platnosc/${idRes}`, message);
  }

  static async getPaymentData(idRes) {
    const response = await api.get(`/rezerwacje/${idRes}`);

    return response.data.cena;
  }
}
