export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._userProfileListener();
    }

    _userProfileListener() {
        const nincknameInput = this.view.getRrofileNicknameElement(),
            emailInput = this.view.getRrofileEmailElement(),
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
                urlInput.value = userInfo.avatar;
                nameInput.value = userInfo.name;
                surnameInput.value = userInfo.surname;
                birthDateInput.value = userInfo.birthDate;
                aboutInput.value = userInfo.profileInfo;

                this._editButtonListener(userInfo, profileMainAvatar);
            })
            .catch(error => {
                console.error('Error getting user info from DB:', error);
            });
    }

    _editButtonListener(userInfo, profileMainAvatar) {
        const editButton = this.view.getRrofileEditButton();

        var inputsBeforeEdit = [];

        editButton.addEventListener('click', () => {

            this.view.clearClassWrongInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const inputs = this.view.getRrofileInputs();

            if (editButton.textContent === 'Edit') {
                this.view.toggleInputs(inputs);
                editButton.textContent = 'Save';
                inputsBeforeEdit = [];
                for (let i = 0; i < 7; i++) {
                    inputsBeforeEdit.push(inputs[i].value);
                }
            } else {
                if (this._isProfileChanged(inputs, inputsBeforeEdit)) {
                    if (this._isValidationOkay(inputs)) {
                        this._editUserProfile(profileMainAvatar, userInfo, inputs, editButton, inputsBeforeEdit);
                    }
                } else {
                    this.view.toggleInputs(inputs);
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
        return isValidationOkay;
    }

    _isThisString(input) {
        return input.match(/^[A-Za-z]+$/);
    }

    _editUserProfile(profileMainAvatar, userInfo, inputs, editButton, inputsBeforeEdit) {

        const editedUser = {
            nickname: inputs[0].value,
            avatar: inputs[2].value,
            name: inputs[3].value,
            surname: inputs[4].value,
            birthDate: inputs[5].value,
            profileInfo: inputs[6].value,
        };

        if (editedUser.nickname === inputsBeforeEdit[0].value) {
            this._updateProfileInDb(userInfo.id, editedUser, profileMainAvatar, inputs, editButton);
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

    _updateProfileInDb(userId, editedUser, profileMainAvatar, inputs, editButton) {
        this.model.getPromiseEditUser(userId, editedUser)
            .then(response => {
                if (response.ok) {
                    console.log('User information updated successfully');
                    this.view.toggleInputs(inputs);
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