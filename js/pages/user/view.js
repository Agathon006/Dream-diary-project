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
            WRONG_INPUT: 'wrong-input',
            WRONG_SPAN: 'wrong-span',
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

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.PROFILE.WRONG_INPUT);
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