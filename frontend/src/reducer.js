export const actionTypes = {
  CHANGE_LOGIN_STATUS: "change-login-status",
  LOG_OUT_USER: "log-out-user",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS:
      const newLoginStatus = !state.userLoggin;
      const data = action.userData.split(" ");
      window.localStorage.setItem("userstatus", data[0]);
      window.localStorage.setItem("email", data[1]);
      return {
        ...state,
        userLoggin: newLoginStatus,
        userStatus: data[0],
        username: data[1],
      };

    case actionTypes.LOG_OUT_USER:
      window.localStorage.removeItem("userstatus");
      window.localStorage.removeItem("email");
      return {
        ...state,
        userLoggin: false,
        userStatus: "",
        username: "",
      };

    default:
      throw new Error(`Nie ma takiej akcji ${action.type}`);
  }
};

export const initialState = {
  userLoggin: Boolean(window.localStorage.getItem("userstatus")),
  userStatus: window.localStorage.getItem("userstatus"),
  username: window.localStorage.getItem("email"),
};
