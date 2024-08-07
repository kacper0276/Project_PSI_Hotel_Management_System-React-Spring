import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useMainContext from "../hooks/useMainContext";

interface AuthenticatedReceptionistRouteProps {
  children: ReactNode;
}

const AuthenticatedReceptionistRoute: React.FC<
  AuthenticatedReceptionistRouteProps
> = ({ children }) => {
  const { state } = useMainContext();

  if (
    state.userLoggin &&
    (state.userStatus === "Administrator" ||
      state.userStatus === "Recepcjonista")
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthenticatedReceptionistRoute;
