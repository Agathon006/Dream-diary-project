/**
 * sign_in page model module.
 * @module js/pages/sign_in/model
 */
export default class Model {

    /**
    Checks if the email input is in a valid email format.
    @param {string} emailInput - The email input to be checked.
    @returns {boolean} - Returns true if the email is in a valid format, otherwise false. */
    isEmailOkay(emailInput) {
        return emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }

    /**
    Checks if the password input meets the specified criteria.
    @param {string} passwordInput - The password input to be checked.
    @returns {boolean} - Returns true if the password meets the criteria, otherwise false. */
    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    /**
    Fetches the list of users from a specified URL.
    @returns {Promise} - Returns a promise with the list of users from the specified URL. */
    getPromiseDbUsers() {
        return fetch('http://localhost:3000/users')
    }

    /**
    Creates a JWT token using the user data and stores it in local storage.
    @param {object} userData - The user data to be stored in the JWT token.
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