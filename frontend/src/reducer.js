export const reducer = (state, action) => {
  switch (action.type) {
    case "change-login-status":
      const newLoginStatus = state.userLoggin === false ? true : false;
      window.localStorage.setItem("userstatus", action.userType);
      return {
        ...state,
        userLoggin: newLoginStatus,
        userStatus: action.userType,
      };

    case "log-out-user":
      return {
        ...state,
        userLoggin: false,
        userStatus: "",
      };

    default:
      throw new Error(`Nie ma takiej akcji ${action.type}`);
  }
};

export const initialState = {
  userLoggin: Boolean(window.localStorage.getItem("userstatus")),
  userStatus: window.localStorage.getItem("userstatus"),
};
