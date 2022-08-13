import { Navigate } from "react-router-dom";
import useAuth from "./hook/useAuth";

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/" replace={true} />;
}