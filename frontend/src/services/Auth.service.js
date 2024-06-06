import { apiJson } from "../api";

export default class AuthService {
  static async loginUser(loginData, context, navigate) {
    const formData = new FormData();
    formData.append("email", loginData.email);
    formData.append("haslo", loginData.password);

    try {
      const response = await apiJson.post(`/uzytkownicy/zaloguj`, formData);

      if (response.data.message.includes("Błędny")) {
        return response.data.message;
      } else {
        context.dispatch({
          type: "change-login-status",
          userData: response.data.message,
        });
        navigate("/");
      }
    } catch (e) {
      if (e.response) {
        return e.response.data;
      }
    }
  }
}
