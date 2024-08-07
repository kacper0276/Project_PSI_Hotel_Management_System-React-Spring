import { ReactNode, useContext } from "react";
import MainContext from "../context/MainContext";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state } = useContext(MainContext);

  if (state.userLoggin) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default AuthenticatedRoute;
