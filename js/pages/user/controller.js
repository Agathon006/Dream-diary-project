export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.oldPasswordMode = true;
    }

    init() {
        this._getRandomUrlButtonListener();
        this._datepickerListener();
        this._userProfileListener();
        this._passwordRepeatInputListener();
        this._passwordInputListener();
        this._passwordCheckBoxListener();
    }

    _getRandomUrlButtonListener() {
        const accessKey = 'LbQIwO2aXDXY-0LkU8nHbgbJvw8n6LB_16Og8cHjOeE',
            profileGetRandomUrlButton = this.view.getRrofileGetRandomUrlButtonElement(),
            profileImageUrl = this.view.getRrofileImageUrlElement(),
            profileMainAvatar = this.view.getRrofileAvatarElement();

        profileGetRandomUrlButton.addEventListener('click', () => {
            this.model.getPromiseGetRandomImageUrl(accessKey)
                .then(response => {
                    if (!response.ok) {
                        console.log('Error...');
                    }
                    return response.json();
                })
                .then(url => {
                    profileImageUrl.value = url.urls.full;
                    this.view.updateImageSrc(profileMainAvatar, profileImageUrl.value);
                })
                .catch(error => {
                    console.error('Error fetching random image URL', error);
                });
        });
    }

    _datepickerListener() {
        $('#datepicker').datepicker();
    }

    _userProfileListener() {
        const nincknameInput = this.view.getRrofileNicknameElement(),
            emailInput = this.view.getRrofileEmailElement(),
            passwordInput = this.view.getRrofilePasswordElement(),
            urlInput = this.view.getRrofileImageUrlElement(),
            nameInput = this.view.getRrofileNameElement(),
            surnameInput = this.view.getRrofileSurnameElement(),
            birthDateInput = this.view.getRrofileBirthDateElement(),
            aboutInput = this.view.getRrofileAboutMeElement(),
            profileMainAvatar = this.view.getRrofileAvatarElement();

        const jwt = require('jsonwebtoken');
        const decodedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));

        this.model.getPromiseGetUserDataByEmail(decodedJwt.email)
            .then(userInfo => {
                this.view.updateImageSrc(profileMainAvatar, userInfo.avatar);
                nincknameInput.value = userInfo.nickname;
                emailInput.value = userInfo.email;
                passwordInput.value = userInfo.password;
                urlInput.value = userInfo.avatar;
                nameInput.value = userInfo.name;
                surnameInput.value = userInfo.surname;
                birthDateInput.value = userInfo.birthDate;
                aboutInput.value = userInfo.profileInfo;

                this._passwordEditButtonListener(userInfo);

                this._editButtonListener(userInfo, profileMainAvatar);
            })
            .catch(error => {
                console.error('Error getting user info from DB:', error);
            });
    }

    _passwordEditButtonListener(userInfo) {
        const passwordEditButton = this.view.getPasswordEditButton(),
            passwordInput = this.view.getRrofilePasswordElement(),
            repeatPasswordSpan = this.view.getRrofileRepeatPasswordSpanElement(),
            repeatPasswordInput = this.view.getRrofileRepeatPasswordElement(),
            inputs = this.view.getRrofilePasswordInputs(),
            passwordEditCheckboxPart = this.view.getPasswordEditCheckboxPart(),
            passwordCheckBox = this.view.getPassworEditCheckBoxInputElement();

        var oldPassword = passwordInput.value;

        passwordEditButton.addEventListener('click', () => {

            if (passwordEditButton.textContent === 'Change password') {
                this.view.toggleInputs(inputs);
                this.view.toggleClassHidden(repeatPasswordSpan);
                this.view.toggleClassHidden(repeatPasswordInput);
                passwordEditButton.textContent = 'Cancel';
            } else if (passwordEditButton.textContent === 'Cancel') {
                this.view.clearClassWrongInputFromElements();
                repeatPasswordInput.value = '';
                this.view.toggleInputs(inputs);
                this.view.toggleClassHidden(repeatPasswordSpan);
                this.view.toggleClassHidden(repeatPasswordInput);
                passwordEditButton.textContent = 'Change password';
            } else {
                if (!this.model.isPasswordOkay(passwordInput.value)) {
                    this.view.clearClassWrongInputFromElements();
                    this.view.clearClassWrongSpanFromElements();
                    this.view.addClassWrongInput(passwordInput);
                    this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
                } else if (passwordInput.value === oldPassword) {
                    this.view.clearClassWrongInputFromElements();
                    this.view.clearClassWrongSpanFromElements();
                    this.view.addClassWrongInput(passwordInput);
                    this.view.createWrongSpanElement(passwordInput, "It's old password");
                } else {
                    this.view.clearClassWrongInputFromElements();
                    this.view.clearClassWrongSpanFromElements();
                    this.view.addClassRightInput(passwordInput);
                    if (this._arePasswordsMatches(passwordInput, repeatPasswordInput)) {
                        const editedUser = {
                            password: passwordInput.value,
                        };
                        this.model.getPromiseEditUser(userInfo.id, editedUser)
                            .then(response => {
                                if (response.ok) {
                                    console.log('User password updated successfully');
                                    this.view.removeClassRightInput(passwordInput);
                                    this.view.removeClassRightInput(repeatPasswordInput);
                                    oldPassword = passwordInput.value;
                                    repeatPasswordInput.value = '';
                                    passwordCheckBox.checked = false;
                                    passwordInput.type = 'password';
                                    repeatPasswordInput.type = 'password';
                                    this.view.toggleInputs(inputs);
                                    this.view.toggleClassHidden(repeatPasswordSpan);
                                    this.view.toggleClassHidden(repeatPasswordInput);
                                    this.view.toggleClassHidden(passwordEditCheckboxPart);
                                    passwordEditButton.textContent = 'Change password';
                                    this.oldPasswordMode = true;
                                } else {
                                    console.error('Failed to update user password');
                                }
                            })
                            .catch(error => {
                                console.error('Error updating user password:', error);
                            });
                    }
                }
            }
        })
    }

    _passwordRepeatInputListener() {
        const passwordEditButton = this.view.getPasswordEditButton(),
            passwordSpan = this.view.getRrofilePasswordSpanElement(),
            passwordInput = this.view.getRrofilePasswordElement(),
            repeatPasswordSpan = this.view.getRrofileRepeatPasswordSpanElement(),
            repeatPasswordInput = this.view.getRrofileRepeatPasswordElement();

        repeatPasswordInput.addEventListener('input', () => {
            console.log(passwordInput.value);
            console.log(repeatPasswordInput.value);
            if (this._arePasswordsMatches(passwordInput, repeatPasswordInput)) {
                if (this.oldPasswordMode) {
                    const passwordEditCheckboxPart = this.view.getPasswordEditCheckboxPart();
                    this.view.toggleClassHidden(passwordEditCheckboxPart);
                    passwordSpan.innerText = 'New password';
                    passwordInput.disabled = false;
                    passwordInput.value = '';
                    repeatPasswordInput.value = '';
                    repeatPasswordSpan.innerText = 'Repeat new password';
                    this.view.removeClassRightInput(repeatPasswordInput);
                    passwordEditButton.textContent = 'Save';
                    this.oldPasswordMode = false;
                }
            }
        });
    }

    _arePasswordsMatches(passwordInput, repeatPasswordInput) {
        if (passwordInput.value === repeatPasswordInput.value) {
            this.view.clearClassWrongInputFromElements()
            this.view.addClassRightInput(repeatPasswordInput);
            return true;
        } else {
            this.view.removeClassRightInput(repeatPasswordInput);
            this.view.addClassWrongInput(repeatPasswordInput);
            return false;
        }
    }

    _passwordInputListener() {
        const passwordInput = this.view.getRrofilePasswordElement(),
            repeatPasswordInput = this.view.getRrofileRepeatPasswordElement();

        passwordInput.addEventListener('input', () => {
            this.view.removeClassWrongInput(repeatPasswordInput)
            this.view.removeClassRightInput(repeatPasswordInput);
        });
    }

    _passwordCheckBoxListener() {
        const passwordCheckBox = this.view.getPassworEditCheckBoxInputElement();
        passwordCheckBox.addEventListener('change', () => {
            var passwordInput = this.view.getRrofilePasswordElement(),
                repeatPasswordInput = this.view.getRrofileRepeatPasswordElement();
            if (passwordCheckBox.checked) {
                passwordInput.type = 'text';
                repeatPasswordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
                repeatPasswordInput.type = 'password';
            }
        });
    }

    _editButtonListener(userInfo, profileMainAvatar) {
        const editButton = this.view.getRrofileEditButton(),
            getRandomUrlButton = this.view.getRrofileGetRandomUrlButtonElement();

        var inputsBeforeEdit = [];

        editButton.addEventListener('click', () => {

            this.view.clearClassWrongInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const inputs = this.view.getRrofileInputs();

            if (editButton.textContent === 'Edit') {
                this.view.toggleInputs(inputs);
                this.view.toggleClassHidden(getRandomUrlButton);
                editButton.textContent = 'Save';
                inputsBeforeEdit = [];
                for (let i = 0; i < 7; i++) {
                    inputsBeforeEdit.push(inputs[i].value);
                }
            } else {
                if (this._isProfileChanged(inputs, inputsBeforeEdit)) {
                    if (this._isValidationOkay(inputs)) {
                        this._editUserProfile(profileMainAvatar, userInfo, inputs, getRandomUrlButton, editButton, inputsBeforeEdit);
                    }
                } else {
                    this.view.toggleInputs(inputs);
                    this.view.toggleClassHidden(getRandomUrlButton);
                    editButton.textContent = 'Edit';
                }
            }
        })
    }

    _isProfileChanged(inputs, inputsBeforeEdit) {
        return inputs[0].value !== inputsBeforeEdit[0] || inputs[2].value !== inputsBeforeEdit[2] || inputs[3].value !== inputsBeforeEdit[3] || inputs[4].value !== inputsBeforeEdit[4] || inputs[5].value !== inputsBeforeEdit[5] || inputs[6].value !== inputsBeforeEdit[6];
    }

    _isValidationOkay(inputs) {
        let isValidationOkay = true;
        if (!inputs[0].value.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/)) {
            this.view.addClassWrongInput(inputs[0]);
            this.view.createWrongSpanElement(inputs[0], "Nickname must consist of 5-15 numbers/letters and can't start with a number");
            isValidationOkay = false;
        }
        if (!inputs[3].value.match(/^[A-Za-z]*$/)) {
            this.view.addClassWrongInput(inputs[3]);
            this.view.createWrongSpanElement(inputs[3], "Name must consist of letters");
            isValidationOkay = false;
        }
        if (!inputs[4].value.match(/^[A-Za-z]*$/)) {
            this.view.addClassWrongInput(inputs[4]);
            this.view.createWrongSpanElement(inputs[4], "Surname must consist of letters");
            isValidationOkay = false;
        }
        if (!inputs[5].value.match(/\/(19[0-9][0-9]|200[0-2]|202[0-3])$/) && inputs[5].value !== '') {
            this.view.addClassWrongInput(inputs[5]);
            this.view.createWrongSpanElement(inputs[5], "Put correct date");
            isValidationOkay = false;
        }
        return isValidationOkay;
    }

    _isThisString(input) {
        return input.match(/^[A-Za-z]+$/);
    }

    _editUserProfile(profileMainAvatar, userInfo, inputs, getRandomUrlButton, editButton, inputsBeforeEdit) {

        const editedUser = {
            nickname: inputs[0].value,
            avatar: inputs[2].value,
            name: inputs[3].value,
            surname: inputs[4].value,
            birthDate: inputs[5].value,
            profileInfo: inputs[6].value,
        };

        if (editedUser.nickname === inputsBeforeEdit[0]) {
            this._updateProfileInDb(userInfo.id, editedUser, profileMainAvatar, inputs, getRandomUrlButton, editButton);
        } else {
            this.model.getPromiseIsNicknameInDb(editedUser.nickname)
                .then(response => {
                    if (!response.ok) {
                        console.log('Error...');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length) {
                        this.view.addClassWrongInput(inputs[0]);
                        this.view.createWrongSpanElement(inputs[0], 'Nickname is already used');
                    }
                    else {
                        this._updateProfileInDb(userInfo.id, editedUser, profileMainAvatar, inputs, editButton);
                    }
                })
                .catch(error => {
                    console.error('Error checking nickname copy in DB:', error);
                });
        }
    }

    _updateProfileInDb(userId, editedUser, profileMainAvatar, inputs, getRandomUrlButton, editButton) {
        this.model.getPromiseEditUser(userId, editedUser)
            .then(response => {
                if (response.ok) {
                    console.log('User information updated successfully');
                    this.view.toggleInputs(inputs);
                    this.view.toggleClassHidden(getRandomUrlButton);
                    editButton.textContent = 'Edit';
                    this.view.updateImageSrc(profileMainAvatar, editedUser.avatar);
                } else {
                    console.error('Failed to update user information');
                }
            })
            .catch(error => {
                console.error('Error updating user information:', error);
            });
    }
}