export default class View {

    static ID = {
        PROFILE: {
            NICKNAME: 'nickname-input',
            EMAIL: 'email-input',
            IMAGE_URL: 'avatar-url-input',
            NAME: 'name-input',
            SURNAME: 'surname-input',
            BIRTH_DATE: 'birth-date-input',
            ABOUT_ME: 'about-input',
            AVATAR: 'profile-main-avatar',
            EDIT_BUTTON: 'profile-edit-button',
        },
    }

    static JS_CLASSES = {
        PROFILE: {
            ALL_INPUTS: 'profile-input',
        },
    }

    getRrofileNicknameElement() {
        return document.querySelector(`#${View.ID.PROFILE.NICKNAME}`);
    }

    getRrofileEmailElement() {
        return document.querySelector(`#${View.ID.PROFILE.EMAIL}`);
    }

    getRrofileImageUrlElement() {
        return document.querySelector(`#${View.ID.PROFILE.IMAGE_URL}`);
    }

    getRrofileNameElement() {
        return document.querySelector(`#${View.ID.PROFILE.NAME}`);
    }

    getRrofileSurnameElement() {
        return document.querySelector(`#${View.ID.PROFILE.SURNAME}`);
    }

    getRrofileBirthDateElement() {
        return document.querySelector(`#${View.ID.PROFILE.BIRTH_DATE}`);
    }

    getRrofileAboutMeElement() {
        return document.querySelector(`#${View.ID.PROFILE.ABOUT_ME}`);
    }

    getRrofileAvatarElement() {
        return document.querySelector(`#${View.ID.PROFILE.AVATAR}`);
    }

    getRrofileEditButton() {
        return document.querySelector(`#${View.ID.PROFILE.EDIT_BUTTON}`);
    }

    getRrofileInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.ALL_INPUTS}`);
    }

    updateImageSrc(image, src) {
        image.setAttribute('src', src);
    }

    toggleInputs(inputs) {
        const array = [];
        inputs.forEach((input, index) => {
            if (index === 1) {
                return
            };
            array.push(input.value);
            input.classList.toggle('locked-input');
        });
        return array;
    }
}