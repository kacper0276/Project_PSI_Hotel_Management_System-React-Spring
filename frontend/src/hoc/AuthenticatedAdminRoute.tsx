// src/components/AuthenticatedAdminRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useMainContext from "../hooks/useMainContext";

interface AuthenticatedAdminRouteProps {
  children: ReactNode;
}

const AuthenticatedAdminRoute: React.FC<AuthenticatedAdminRouteProps> = ({
  children,
}) => {
  const { state } = useMainContext();

  if (state.userLoggin && state.userStatus === "Administrator") {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthenticatedAdminRoute;
