export default class View {

    static ID = {
        REGISTER_FORM: {
            FORM: 'register-form',
            EMAIL_INPUT: 'email-input',
            PASSWORD_INPUT: 'password-input',
            SUBMIT_INPUT: 'register-form-submit',
        },
    }

    static JS_CLASSES = {
        REGISTER_FORM: {
            WRONG_INPUT: 'wrong-input',
            WRONG_SPAN: 'wrong-span',
        },
    }

    getRegistrerFormElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.FORM}`);
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

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
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