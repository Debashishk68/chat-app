import { useQuery } from "@tanstack/react-query"
import fetchUsers from "../apis/users";

const useUsers = () => {
  return  useQuery({
        queryFn: fetchUsers,
        queryKey: ["users"],
    });
}
export default useUsers;