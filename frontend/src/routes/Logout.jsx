import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import socket from "../utils/socket";

const Logout = () => {
  const {mutate:logout} = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); 
    navigate("/login"); 
  }, []);

  return <p>Logging out...</p>;
};

export default Logout;
