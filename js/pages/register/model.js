export default class Model {


    isNicknameOkay(nicknameInput) {
        return nicknameInput.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/);
    }

    isEmailOkay(emailInput) {
        return emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
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

    registerNewUser(data) {
        return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
    }

}