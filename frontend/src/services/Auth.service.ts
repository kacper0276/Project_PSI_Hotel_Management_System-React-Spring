import { AxiosError } from "axios";
import { apiJson } from "../api";
import { actionTypes } from "../reducer";
import { Dispatch } from "react";
import { Action } from "../types/mainContext.types";
import { NavigateFunction } from "react-router-dom";
import { LoginData } from "../types/auth.types";
import { ApiResponse } from "../types/api.types";

export default class AuthService {
  static async loginUser(
    loginData: LoginData,
    context: { dispatch: Dispatch<Action> },
    navigate: NavigateFunction
  ): Promise<string | undefined> {
    const formData = new FormData();
    formData.append("email", loginData.email);
    formData.append("haslo", loginData.password);

    try {
      const response = await apiJson.post<ApiResponse>(
        `/uzytkownicy/zaloguj`,
        formData
      );

      if (response.data.message.includes("Błędny")) {
        return response.data.message;
      } else {
        context.dispatch({
          type: actionTypes.CHANGE_LOGIN_STATUS,
          userData: response.data.message,
        });
        navigate("/");
        return;
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        return e.response.data as string;
      }
      return undefined;
    }
  }

  // TODO: Rejestracja / aktywacja konta

  static async refreshToken(): Promise<any> {
    try {
      const response = await apiJson.post<any>(`/uzytkownicy/refresh-token`);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e;
      }
      throw new Error("An unknown error occurred");
    }
  }
}
