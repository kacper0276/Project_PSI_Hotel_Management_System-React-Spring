import { api } from "../api";

export default class UserService {
  static async getAllUsers() {
    const response = await api.get(`/uzytkownicy`);
    return response.data;
  }

  static async deleteUser(id) {
    await api.delete(`/uzytkownicy/${id}`);
  }

  static async getUserDetails(id) {
    const response = await api.get(`/uzytkownicy/szukaj/id/${id}`);

    return response.data;
  }
}
