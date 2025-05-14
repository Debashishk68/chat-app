const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/dashboard/users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
export default fetchUsers;