export default class View {

    static ID = {
        PROFILE: {
            NICKNAME: 'nickname-input',
            EMAIL: 'email-input',
            PASSWORD_SPAN: 'password-span',
            PASSWORD: 'password-input',
            REPEAT_PASSWORD_SPAN: 'repeat-password-span',
            REPEAT_PASSWORD: 'password-repeat-input',
            IMAGE_URL: 'avatar-url-input',
            NAME: 'name-input',
            SURNAME: 'surname-input',
            BIRTH_DATE: 'birth-date-input',
            ABOUT_ME: 'about-input',
            AVATAR: 'profile-main-avatar',
            EDIT_BUTTON: 'profile-edit-button',
            PASSWORD_EDIT_BUTTON: 'password-edit-button',
            PASSWORD_EDIT_CHECKBOX_PART: 'password-edit-checkbox-part',
            PASSWORD_EDIT_CHECKBOX_BOX: 'password-check-box',
        },
    }

    static JS_CLASSES = {
        PROFILE: {
            ALL_INPUTS: 'profile-input',
            ALL_PASSWORD_INPUTS: 'profile-password-input',
            WRONG_INPUT: 'wrong-input',
            RIGHT_INPUT: 'right-input',
            WRONG_SPAN: 'wrong-span',
        },
        COMMON: {
            HIDDEN: 'hidden',
        },
    }

    getRrofileNicknameElement() {
        return document.querySelector(`#${View.ID.PROFILE.NICKNAME}`);
    }

    getRrofileEmailElement() {
        return document.querySelector(`#${View.ID.PROFILE.EMAIL}`);
    }

    getRrofilePasswordSpanElement() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_SPAN}`);
    }

    getRrofilePasswordElement() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD}`);
    }

    getRrofileRepeatPasswordSpanElement() {
        return document.querySelector(`#${View.ID.PROFILE.REPEAT_PASSWORD_SPAN}`);
    }

    getRrofileRepeatPasswordElement() {
        return document.querySelector(`#${View.ID.PROFILE.REPEAT_PASSWORD}`);
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

    getPasswordEditButton() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_EDIT_BUTTON}`);
    }

    getPasswordEditCheckboxPart() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_EDIT_CHECKBOX_PART}`);
    }

    getPassworEditCheckBoxInputElement() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_EDIT_CHECKBOX_BOX}`);
    }

    getRrofileEditButton() {
        return document.querySelector(`#${View.ID.PROFILE.EDIT_BUTTON}`);
    }

    getRrofileInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.ALL_INPUTS}`);
    }

    getRrofilePasswordInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.ALL_PASSWORD_INPUTS}`);
    }

    toggleClassHidden(element) {
        element.classList.toggle(View.JS_CLASSES.COMMON.HIDDEN);
    }

    updateImageSrc(image, src) {
        image.setAttribute('src', src);
    }

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    }

    removeClassWrongInput(element) {
        element.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    }

    addClassRightInput(element) {
        element.classList.add(View.JS_CLASSES.PROFILE.RIGHT_INPUT);
    }

    removeClassRightInput(element) {
        element.classList.remove(View.JS_CLASSES.PROFILE.RIGHT_INPUT);
    }

    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.PROFILE.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    clearClassWrongInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
        });
    }

    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }

    toggleInputs(inputs) {
        inputs.forEach((input, index) => {
            if (index === 1) {
                return
            };
            input.classList.toggle('locked-input');
        });
    }
}