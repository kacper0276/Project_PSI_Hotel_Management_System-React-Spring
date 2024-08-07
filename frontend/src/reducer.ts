import {
  State,
  Action,
  ChangeLoginStatusAction,
} from "./types/mainContext.types";

export const actionTypes = {
  CHANGE_LOGIN_STATUS: "change-login-status",
  LOG_OUT_USER: "log-out-user",
};

const isChangeLoginStatusAction = (
  action: Action
): action is ChangeLoginStatusAction => {
  return action.type === actionTypes.CHANGE_LOGIN_STATUS;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS:
      if (isChangeLoginStatusAction(action)) {
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
      }
      return state;

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

export const initialState: State = {
  userLoggin: Boolean(window.localStorage.getItem("userstatus")),
  userStatus: window.localStorage.getItem("userstatus"),
  username: window.localStorage.getItem("email"),
};
