export const reducer = (state, action) => {
  switch (action.type) {
    case "change-login-status":
      const newLoginStatus = state.userLoggin === false ? true : false;
      const data = action.userData.split(" ");
      window.localStorage.setItem("userstatus", data[0]);
      window.localStorage.setItem("email", data[1]);
      return {
        ...state,
        userLoggin: newLoginStatus,
        userStatus: data[0],
        userName: data[1],
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
  userName: window.localStorage.getItem("email"),
};
