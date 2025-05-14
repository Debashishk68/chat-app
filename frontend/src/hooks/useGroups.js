import { useMutation } from "@tanstack/react-query"
import sendGroupPic from "../apis/groups";

const useUploadGroupPic=()=>{
   return useMutation({
    mutationFn: sendGroupPic,
    mutationKey:"upload",
    onSucess:()=>{
        console.log(data);
    },
    onError: (error) => {
        console.error(error);
        
      },
   })
}
export default useUploadGroupPic;