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
                // console.log(userInfo);
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

        editButton.addEventListener('click', () => {
            const inputs = this.view.getRrofileInputs();

            if (editButton.textContent === 'Edit') {
                this.view.toggleInputs(inputs);
                editButton.textContent = 'Save';
            } else {
                const inputsValues = this.view.toggleInputs(inputs);
                editButton.textContent = 'Edit';

                if (this._isProfileChanged(inputsValues, userInfo)) {
                    this._editUserProfile(inputsValues, profileMainAvatar, userInfo, inputs, editButton);
                };
            }
        })
    }

    _isProfileChanged(inputsValues, userInfo) {
        return userInfo.nickname !== inputsValues[0] || userInfo.avatar !== inputsValues[1] || userInfo.name !== inputsValues[2] || userInfo.surname !== inputsValues[3] || userInfo.birthDate !== inputsValues[4] || userInfo.profileInfo !== inputsValues[5];
    }

    _editUserProfile(inputsValues, profileMainAvatar, userInfo, inputs, editButton) {

        const editedUser = {
            nickname: inputsValues[0],
            avatar: inputsValues[1],
            name: inputsValues[2],
            surname: inputsValues[3],
            birthDate: inputsValues[4],
            profileInfo: inputsValues[5],
        };

        if (editedUser.nickname === userInfo.nickname) {
            this._updateProfileInDb(userInfo.id, editedUser, profileMainAvatar);
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
                        console.log('Nickname is alredy used');
                        this.view.toggleInputs(inputs);
                        editButton.textContent = 'Save';
                    }
                    else {
                        this._updateProfileInDb(userInfo.id, editedUser, profileMainAvatar);
                    }
                })
                .catch(error => {
                    console.error('Error checking nickname copy in DB:', error);
                });
        }
    }

    _updateProfileInDb(userId, editedUser, profileMainAvatar) {
        this.model.getPromiseEditUser(userId, editedUser)
            .then(response => {
                if (response.ok) {
                    console.log('User information updated successfully');
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