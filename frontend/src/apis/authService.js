const registerUser = async (user) => {
   
    const formData =new FormData();
    formData.append("name",user.name)
    formData.append("email",user.email)
    formData.append("password",user.password)

    formData.append("file",user.file)
    
 try {
    const response= await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: formData,
        credentials:"include"
      });
      const data = await response.json();
      return data;
 } catch (error) {
    throw error;
 }
};

const LoginUser = async (user) => {
  
 try {
    const response= await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
        credentials:"include"
      });
      const data = await response.json();
      return data;
 } catch (error) {
    throw error;
 }
};

const LogoutUser = async () => {
   try {
      const response= await fetch("http://localhost:3000/api/auth/logout", {
         method: "POST",
         credentials:"include"
         });
         const data = await response.json();
         return data;
   } catch (error) {
      throw error;
   }
}
export { registerUser,LoginUser,LogoutUser };

