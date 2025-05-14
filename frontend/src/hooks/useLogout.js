import { useMutation } from "@tanstack/react-query"
import { LogoutUser } from "../apis/authservice"
import socket from "../utils/socket";

const useLogout =()=>{
    return useMutation({

        mutationFn: LogoutUser,
        onSuccess: (data) => {
            console.log(data);
            socket.disconnect();
            window.location.href = "/login";
        },
        onError: (error) => {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        },
    })
}
export default useLogout;