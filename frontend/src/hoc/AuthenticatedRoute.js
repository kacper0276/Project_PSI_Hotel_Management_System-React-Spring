import { useContext } from "react";
import MainContext from "../context/MainContext";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute({ childred }) {
  const context = useContext(MainContext);

  if (context.state.userLoggin) {
    return childred;
  } else {
    return <Navigate to={"/"} />;
  }
}
