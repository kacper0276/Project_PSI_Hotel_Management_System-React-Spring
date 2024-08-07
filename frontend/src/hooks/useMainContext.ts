import { useContext } from "react";
import MainContext from "../context/MainContext";
import { MainContextProps } from "../types/context.types";

const useMainContext = (): MainContextProps => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }

  return context;
};

export default useMainContext;
