export const reducer = (state, action) => {
  switch (action.type) {
    case "change-login-status":
      const newLoginStatus = state.userLoggin === false ? true : false;
      console.log(action.userData);
      window.localStorage.setItem("userstatus", action.userData[0]);
      window.localStorage.setItem("email", action.userData[1]);
      return {
        ...state,
        userLoggin: newLoginStatus,
        userStatus: action.userData[0],
        userName: action.userData[1],
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
