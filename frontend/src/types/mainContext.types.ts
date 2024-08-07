import { actionTypes } from "../reducer";

export interface State {
  userLoggin: boolean;
  userStatus: string | null;
  username: string | null;
}

export interface ChangeLoginStatusAction {
  type: typeof actionTypes.CHANGE_LOGIN_STATUS;
  userData: string;
}

export interface LogOutUserAction {
  type: typeof actionTypes.LOG_OUT_USER;
}

export type Action = ChangeLoginStatusAction | LogOutUserAction;
