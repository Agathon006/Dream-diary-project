/**
 * register page model module.
 * @module js/pages/register/model
 */
export default class Model {

    isNicknameOkay(nicknameInput) {
        return nicknameInput.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/);
    }

    isEmailOkay(emailInput) {
        return emailInput.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/);
    }

    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    isNicknameInDb(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    isEmailInDb(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    generateRandomCode(length) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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

    registerNewUser(data) {
        return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
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