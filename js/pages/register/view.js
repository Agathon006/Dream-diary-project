export default class View {

    static ID = {
        REGISTER_FORM: {
            FORM: 'register-form',
            NICKNAME_INPUT: 'nickname-input',
            EMAIL_INPUT: 'email-input',
            PASSWORD_INPUT: 'password-input',
            SUBMIT_INPUT: 'register-form-submit',
        },
        CODE_FORM: {
            FORM: 'code-form',
        },
        DEV_MESSAGE: {
            FORM: 'dev-message',
            CODE: 'dev-message-code',
        },
    }

    static JS_CLASSES = {
        REGISTER_FORM: {
            WRONG_INPUT: 'wrong-input',
            RIGHT_INPUT: 'right-input',
            WRONG_SPAN: 'wrong-span',
        },
        CODE_FORM: {
            NUMBER: 'code-form__number',
        },
        COMMON: {
            HIDDEN: 'hidden',
            NOT_EXIST: 'not-exist',
        },
    }

    getRegistrerFormElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.FORM}`);
    }

    getNicknameInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.NICKNAME_INPUT}`);
    }

    getEmailInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.EMAIL_INPUT}`);
    }

    getPasswordInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.PASSWORD_INPUT}`);
    }

    getSubmitInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.SUBMIT_INPUT}`);
    }

    getCodeFormElement() {
        return document.querySelector(`#${View.ID.CODE_FORM.FORM}`);
    }

    getCodeFormNumberInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.CODE_FORM.NUMBER}`);
    }

    getDevMessageElement() {
        return document.querySelector(`#${View.ID.DEV_MESSAGE.FORM}`);
    }

    getDevMessageCodeElement() {
        return document.querySelector(`#${View.ID.DEV_MESSAGE.CODE}`);
    }

    removeClassHidden(element) {
        element.classList.remove(View.JS_CLASSES.COMMON.HIDDEN);
    }

    removeClassNotExist(element) {
        element.classList.remove(View.JS_CLASSES.COMMON.NOT_EXIST);
    }

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    addClassRightInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
    }

    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    clearClassWrongInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
        });
    }

    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }
}