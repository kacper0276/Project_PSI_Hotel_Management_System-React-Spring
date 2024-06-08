import { api, apiJson } from "../api";

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

  static async changeUserData(userData) {
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("haslo", userData.password);
    formData.append("rola", userData.rola);

    const response = await apiJson.put(
      `/uzytkownicy/zmien-dane/${userData.id}`,
      formData
    );

    return response.data.message;
  }

  static async findUserByEmail(email) {
    const response = await api.get(`/uzytkownicy/szukaj/email/${email}`);

    return response.data;
  }
}
