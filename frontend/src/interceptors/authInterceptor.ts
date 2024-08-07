import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { actionTypes } from "../reducer";
import AuthService from "../services/Auth.service";
import { Action } from "../types/mainContext.types";
import { apiJson } from "../api";

const setupAuthInterceptor = (dispatch: Dispatch<Action>) => {
  let hasRefreshed = false;

  apiJson.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const { response, config } = error;

      if (response && (response.status === 401 || response.status === 403)) {
        if (hasRefreshed) {
          dispatch({ type: actionTypes.LOG_OUT_USER });
          return Promise.reject(error);
        }

        hasRefreshed = true;

        try {
          await AuthService.refreshToken();

          if (config) {
            return apiJson(config as InternalAxiosRequestConfig);
          } else {
            throw new Error("Error config is undefined");
          }
        } catch (err) {
          dispatch({ type: actionTypes.LOG_OUT_USER });
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupAuthInterceptor;
