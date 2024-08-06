import { useContext } from "react";
import MainContext from "../context/MainContext";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute({ children }) {
  const context = useContext(MainContext);

  if (context.state.userLoggin) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
