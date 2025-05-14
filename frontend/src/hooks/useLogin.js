import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../apis/authservice";
import socket from "../utils/socket";

const useLogin = () => {
  return useMutation({
    mutationFn: LoginUser,
    mutationKey: ['user'],
    onSuccess: (data) => {
    //   const { userName, user } = data;
    //   socket.connect();
    //   socket.emit("register", { userName });
    //   localStorage.setItem("userId", user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export default useLogin;
