const sendGroupPic = async (data) => {
    const formData =new FormData();
        formData.append("file",data)
        console.log(data)
    const response = await fetch('http://localhost:3000/dashboard/grouppic',{
        method: 'POST',
        body: formData,
        credentials: 'include',
    });

    if (!response.ok) {
        response.json().then((data) => {
            console.error("Error:", data.message);
        });
         // Handle error response
        throw new Error('Network response was not ok');
    }
    return response.json();
}
export default sendGroupPic;