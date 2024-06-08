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

  static async createReservation(reservationData, username) {
    const formData = new FormData();

    Object.keys(reservationData).forEach((key) => {
      formData.append(key, reservationData[key]);
    });

    const response = await apiJson.post(`/rezerwacje/${username}`, formData);

    return response.data.message;
  }

  static async fetchUserReservations(username) {
    const response = await api.get(
      `/rezerwacje/rezerwacje-uzytkownika/${username}`
    );

    return response.data;
  }
}
