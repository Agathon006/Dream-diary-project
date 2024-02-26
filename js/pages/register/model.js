/**
 * register page model module.
 * @module js/pages/register/model
 */
export default class Model {

    /**
    Validates if a nickname is okay based on specific criteria
    @param {string} nicknameInput - The nickname to be validated
    @return {boolean} - True if the nickname matches the criteria, otherwise false */
    isNicknameOkay(nicknameInput) {
        return nicknameInput.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/);
    }

    /**
    Validates if an email is okay based on specific criteria
    @param {string} emailInput - The email to be validated
    @return {boolean} - True if the email matches the criteria, otherwise false */
    isEmailOkay(emailInput) {
        return emailInput.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/);
    }

    /**
    Validates if a password is okay based on specific criteria
    @param {string} passwordInput - The password to be validated
    @return {boolean} - True if the password matches the criteria, otherwise false */
    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    /**
    Checks if a nickname exists in the database
    @param {string} nickname - The nickname to check in the database
    @return {Promise} - A Promise object with the result of the database query */
    isNicknameInDb(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    /**
    Checks if an email exists in the database
    @param {string} email - The email to check in the database
    @return {Promise} - A Promise object with the result of the database query */
    isEmailInDb(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    /**
    Generates a random code of a specified length
    @param {number} length - The length of the random code to generate
    @return {string} - The randomly generated code */
    generateRandomCode(length) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
    Validates if the input value is a number and adjusts it accordingly.
    @param {object} input - The input element to be validated. */
    passIfNumber(input) {
        if (input.value.length === 1) {
            if (!input.value.match(/^[0-9]$/)) {
                input.value = input.value.slice(1);
            }
        } else if (input.value.length === 2) {
            if (!input.value.match(/^[0-9][0-9]$/)) {
                input.value = input.value.slice(0, -1);
            } else {
                input.value = input.value.slice(1);
            }
        } else {
            input.value = '';
        }
    }

    /**
    Registers a new user by sending a POST request to the specified URL.
    @param {object} data - The data to be sent in the request body.
    @returns {Promise} - A Promise containing the response from the server. */
    registerNewUser(data) {
        return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
    }

    /**
    Creates a JSON Web Token using the provided user data.
    @param {Object} userData - The data of the user to include in the JWT payload.
    */
    createJwt(userData) {
        const jwt = require('jsonwebtoken');
        const payload = userData;
        const secretKey = '8dshsdf8s3hfsdh8fshf8dhfs3hhfhfsh38fh';
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

        localStorage.token = token;
        localStorage.secretKey = secretKey;
    }

}