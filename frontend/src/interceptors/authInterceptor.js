import { apiJson } from "../api";
import { logout } from "../store/authActions";
import AuthService from "../services/Auth.service";

const setupAuthInterceptor = (dispatch) => {
  let hasRefreshed = false;

  apiJson.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;

      if (response && (response.status === 401 || response.status === 403)) {
        if (hasRefreshed) {
          dispatch(logout());
          return Promise.reject(error);
        }

        hasRefreshed = true;

        try {
          await AuthService.refreshToken();
          return apiJson(error.config);
        } catch (err) {
          dispatch(logout());
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupAuthInterceptor;
