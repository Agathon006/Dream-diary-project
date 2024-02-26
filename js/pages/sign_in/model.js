/**
 * sign_in page model module.
 * @module js/pages/sign_in/model
 */
export default class Model {

    isEmailOkay(emailInput) {
        return emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }

    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    getPromiseDbUsers() {
        return fetch('http://localhost:3000/users')
    }

    createJwt(userData) {
        const jwt = require('jsonwebtoken');
        const payload = userData;
        const secretKey = '8dshsdf8s3hfsdh8fshf8dhfs3hhfhfsh38fh';
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

        localStorage.token = token;
        localStorage.secretKey = secretKey;
    }

}