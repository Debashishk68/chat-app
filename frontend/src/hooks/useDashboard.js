import { useMutation } from "@tanstack/react-query"
import { dashboardApi } from "../apis/dashboard"

const useDashboard = () => {
    return useMutation({
        mutationFn:dashboardApi,
        mutationKey:["dashboard"],
        onSuccess:(data)=>{
            console.log(data);
        },
        onError:(error)=>{
            console.log(error);
        }
    })
}
export default useDashboard