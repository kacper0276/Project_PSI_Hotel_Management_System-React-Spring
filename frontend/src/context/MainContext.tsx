import React, { createContext, useReducer, ReactNode } from "react";
import { reducer, initialState } from "../reducer";
import { MainContextProps } from "../types/context.types";

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
