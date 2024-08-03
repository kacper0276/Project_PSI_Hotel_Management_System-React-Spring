import { apiJson } from "../api";
import { actionTypes } from "../reducer";
import AuthService from "../services/Auth.service";

const setupAuthInterceptor = (dispatch) => {
  let hasRefreshed = false;

  apiJson.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;

      if (response && (response.status === 401 || response.status === 403)) {
        if (hasRefreshed) {
          dispatch({ type: actionTypes.LOG_OUT_USER });
          return Promise.reject(error);
        }

        hasRefreshed = true;

        try {
          await AuthService.refreshToken();
          return apiJson(error.config);
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
