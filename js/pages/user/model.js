/**
 * user page model module.
 * @module js/pages/user/model
 */
export default class Model {

    /**
    Fetches a random image URL from Unsplash API.
    @param {string} accessKey - The access key required to authenticate the request.
    @returns {Promise} - A promise that resolves to the fetched image URL. */
    getPromiseGetRandomImageUrl(accessKey) {
        return fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
    }

    /**
    Validates if a password meets the specified criteria.
    @param {string} passwordInput - The password to be validated.
    @returns {boolean} - Returns true if the password meets the criteria, otherwise false. */
    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    /**
    Fetches user data based on the provided email address.
    @param {string} email - The email address of the user.
    @returns {Promise} - A promise that resolves to the user data fetched by email. */
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

    /**
    Fetches a promise that checks if a nickname exists in the database.
    @param {string} nickname - The nickname to check in the database.
    @returns {Promise} - A promise that resolves with the response from the API call. */
    getPromiseIsNicknameInDb(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    /**
    Fetches a promise to edit a user in the database.
    @param {string} id - The id of the user to edit.
    @param {object} newData - The new data to update the user with.
    @returns {Promise} - A promise that resolves with the response from the API call. */
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