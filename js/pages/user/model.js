export default class Model {

    getPromiseGetRandomImageUrl(accessKey) {
        return fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
    }

    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    getPromiseGetUserDataByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
            .then(response => response.json())
            .then(data => {
                if (data.length) {
                    return data[0];
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getPromiseIsNicknameInDb(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    getPromiseEditUser(id, newData) {
        return fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
    }
}