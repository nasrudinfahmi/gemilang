import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { email, password, setEmail, setPassword } = useContext(AuthContext);
  return { email, password, setEmail, setPassword };
};

export { useAuth };
