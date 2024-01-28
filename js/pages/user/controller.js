export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._userProfileListener();
    }

    _userProfileListener() {
        const nincknameInput = document.querySelector('#nickname-input'),
            emailInput = document.querySelector('#email-input'),
            nameInput = document.querySelector('#name-input'),
            surnameInput = document.querySelector('#surname-input'),
            birthDateInput = document.querySelector('#birth-date-input'),
            aboutInput = document.querySelector('#about-input');
        const jwt = require('jsonwebtoken');
        const decodedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));
        this.model.getUserDataByEmail(decodedJwt.email)
            .then(userInfo => {
                console.log(userInfo);
                nincknameInput.value = userInfo.nickname;
                emailInput.value = userInfo.email;
                nameInput.value = userInfo.name;
                surnameInput.value = userInfo.surname;
                birthDateInput.value = userInfo.birthDate;
                aboutInput.value = userInfo.profileInfo;

                const editButton = document.querySelector('#profile-edit-button');
                editButton.addEventListener('click', () => {
                    const inputs = document.querySelectorAll('.profile-input');

                    if (editButton.textContent === 'Edit') {
                        inputs.forEach((input, index) => {
                            if (index === 1) {
                                return
                            };
                            input.classList.toggle('locked-input');
                        });
                        editButton.textContent = 'Save';
                    } else {
                        const inputsValues = [];
                        inputs.forEach((input, index) => {
                            if (index === 1) {
                                return
                            };
                            inputsValues.push(input.value);
                            input.classList.toggle('locked-input');
                        });
                        const editedUser = {};
                        if (nincknameInput.value === userInfo.nickname) {
                            editedUser.nickname = inputsValues[0];
                            editedUser.name = inputsValues[1];
                            editedUser.surname = inputsValues[2];
                            editedUser.birthDate = inputsValues[3];
                            editedUser.profileInfo = inputsValues[4];
                            this.model.editUser(userInfo.id, editedUser);
                            editButton.textContent = 'Edit';
                        } else {
                            this.model.isNicknameInDb(nincknameInput.value)
                                .then(response => {
                                    if (!response.ok) {
                                        this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    if (data.length) {
                                        //...
                                        console.log('Nickname is alredy used');
                                    }
                                    else {
                                        editedUser.nickname = inputsValues[0];
                                        editedUser.name = inputsValues[1];
                                        editedUser.surname = inputsValues[2];
                                        editedUser.birthDate = inputsValues[3];
                                        editedUser.profileInfo = inputsValues[4];
                                        this.model.editUser(userInfo.id, editedUser);
                                        editButton.textContent = 'Edit';
                                    }
                                })
                        }
                    }
                })
            })
            .catch(error => {
                console.log('error...')
            });
    }
}