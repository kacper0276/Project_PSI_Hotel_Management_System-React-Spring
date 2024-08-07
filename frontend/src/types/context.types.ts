import { Action, State } from "./mainContext.types";

export interface MainContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
