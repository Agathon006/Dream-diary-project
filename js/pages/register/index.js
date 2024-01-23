'use strict';

// import Model from './model.js'
// import View from './view.js'
// import Controller from './controller.js'

// window.addEventListener('DOMContentLoaded', () => {
//     new Controller(new View(), new Model()).init();
// });

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#register-form'),
        nicknameInput = document.querySelector('#nickname-input'),
        emailInput = document.querySelector('#email-input'),
        passwordInput = document.querySelector('#password-input'),
        SubmitButton = document.querySelector('#register-form-submit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelectorAll('.wrong-input').forEach(item => {
            item.classList.remove('wrong-input');
        })
        document.querySelectorAll('.wrong-span').forEach(item => {
            item.remove();
        })

        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);
        console.log(formInfo);
        let isValidationOkay = true;
        if (!formInfo.nickname.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/)) {
            nicknameInput.classList.add('wrong-input');
            let warningSpan = document.createElement('span');
            warningSpan.innerText = "Nickname must consist of 5-15 numbers/letters and can't start with a number";
            warningSpan.classList.add('wrong-span');
            nicknameInput.parentNode.insertBefore(warningSpan, nicknameInput.nextSibling);
            isValidationOkay = false;
        }
        if (!formInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailInput.classList.add('wrong-input');
            let warningSpan = document.createElement('span');
            warningSpan.innerText = "Incorrect email";
            warningSpan.classList.add('wrong-span');
            emailInput.parentNode.insertBefore(warningSpan, emailInput.nextSibling);
            isValidationOkay = false;
        }
        if (!formInfo.password.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/)) {
            passwordInput.classList.add('wrong-input');
            let warningSpan = document.createElement('span');
            warningSpan.innerText = "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter";
            warningSpan.classList.add('wrong-span');
            passwordInput.parentNode.insertBefore(warningSpan, passwordInput.nextSibling);
            isValidationOkay = false;
        }

        if (isValidationOkay) {
            const isNicknameInDb = fetch(`http://localhost:3000/users?nickname=${formInfo.nickname}`)
                .then(response => {
                    if (!response.ok) {
                        let warningSpan = document.createElement('span');
                        warningSpan.innerText = "Network response was not ok";
                        warningSpan.classList.add('wrong-span');
                        SubmitButton.parentNode.insertBefore(warningSpan, SubmitButton.nextSibling);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length) {
                        nicknameInput.classList.add('wrong-input');
                        let warningSpan = document.createElement('span');
                        warningSpan.innerText = "That nickname is already used";
                        warningSpan.classList.add('wrong-span');
                        nicknameInput.parentNode.insertBefore(warningSpan, nicknameInput.nextSibling);
                        return true;
                    }
                    return false;
                })
                .catch(error => {
                    let warningSpan = document.createElement('span');
                    warningSpan.innerText = "Something go wrong... ";
                    warningSpan.classList.add('wrong-span');
                    SubmitButton.parentNode.insertBefore(warningSpan, SubmitButton.nextSibling);
                });

            const isEmailInDb = fetch(`http://localhost:3000/users?email=${formInfo.email}`)
                .then(response => {
                    if (!response.ok) {
                        let warningSpan = document.createElement('span');
                        warningSpan.innerText = "Network response was not ok";
                        warningSpan.classList.add('wrong-span');
                        SubmitButton.parentNode.insertBefore(warningSpan, SubmitButton.nextSibling);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length) {
                        emailInput.classList.add('wrong-input');
                        let warningSpan = document.createElement('span');
                        warningSpan.innerText = "That email is already used";
                        warningSpan.classList.add('wrong-span');
                        emailInput.parentNode.insertBefore(warningSpan, emailInput.nextSibling);
                        return true;
                    }
                    return false;
                })
                .catch(error => {
                    let warningSpan = document.createElement('span');
                    warningSpan.innerText = "Something go wrong... ";
                    warningSpan.classList.add('wrong-span');
                    SubmitButton.parentNode.insertBefore(warningSpan, SubmitButton.nextSibling);
                });

            Promise.all([isNicknameInDb, isEmailInDb])
                .then(data => {
                    if (!(data[0] || data[1])) {

                        const data = JSON.stringify(Object.fromEntries(formData));

                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: data,
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then((jsonData) => {
                                console.log('Data posted: ', jsonData);
                            })
                            .catch((error) => {
                                console.error('Error posting data: ', error);
                                let warningSpan = document.createElement('span');
                                warningSpan.innerText = "Something go wrong... ";
                                warningSpan.classList.add('wrong-span');
                                SubmitButton.parentNode.insertBefore(warningSpan, SubmitButton.nextSibling);
                            });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
});