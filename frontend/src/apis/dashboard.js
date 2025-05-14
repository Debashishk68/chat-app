export const dashboardApi = async()=>{
   try {
    const response = await fetch(`http://localhost:3000/dashboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include"
    })
    const data = await response.json();
    return data;
   } catch (error) {
      throw error;
   }
} 