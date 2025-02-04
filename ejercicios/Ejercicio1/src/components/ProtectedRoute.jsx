import { isAuthenticated } from "../auth.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();

  if (!auth) {
    alert("Acceso denegado: Por favor, inicia sesión primero");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
