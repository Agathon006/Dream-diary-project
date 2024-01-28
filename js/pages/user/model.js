export default class Model {

    getUserDataByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
            .then(response => response.json())
            .then(data => {
                const user = data.find(user => user.email === email);
                if (user) {
                    return user;
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    isNicknameInDb(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    editUser(id, newData) {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('User information updated successfully');
                    // Perform any additional actions after the update is successful
                } else {
                    console.error('Failed to update user information');
                }
            })
            .catch(error => {
                console.error('Error updating user information:', error);
            });
    }
}