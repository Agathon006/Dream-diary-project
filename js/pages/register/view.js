import i18next from 'i18next';

export default class View {

    static ID = {
        REGISTER_FORM: {
            FORM: 'register-form',
            NICKNAME_INPUT: 'nickname-input',
            EMAIL_INPUT: 'email-input',
            PASSWORD_INPUT: 'password-input',
            PASSWORD_CHECKBOX_INPUT: 'password-check-box',
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
            INPUT: 'register-form__input',
        },
        CODE_FORM: {
            NUMBER: 'code-form__number',
        },
        COMMON: {
            HIDDEN: 'hidden',
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

    getPassworCheckBoxInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.PASSWORD_CHECKBOX_INPUT}`);
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

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    addClassRightInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
    }

    removeClassWrongInput(element) {
        element.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    removeClassRightInput(element) {
        element.classList.remove(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
    }

    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    addClassRightToNotWrongElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.INPUT}`).forEach(element => {
            if (!element.classList.contains(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT)) {
                element.classList.add(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
            }
        });
    }

    clearClassWrongAndRightInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
        });
    }

    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }

    translatePage() {
        fetch('../dictionary.json')
            .then(response => response.json())
            .then(data => {
                i18next.init({
                    lng: 'ru',
                    debug: false,
                    resources: {
                        ru: {
                            translation: data
                        }
                    }
                });

                document.querySelector(`#form-title`).textContent = i18next.t('register.form_title');
                document.querySelector(`#form-nickname-span`).textContent = i18next.t('register.form_nickname_span');
                document.querySelector(`#form-password-span`).textContent = i18next.t('register.form_password_span');
                document.querySelector(`#form-show-password-span`).textContent = i18next.t('register.form_show_password_span');
                document.querySelector(`#form-small-span`).textContent = i18next.t('register.form_small_span');
                document.querySelector(`#register-form-submit`).value = i18next.t('register.form_submit');
                document.querySelector(`#form-already-registered-span`).textContent = i18next.t('register.already_registered_span');
                document.querySelector(`#form-already-registered-button`).textContent = i18next.t('register.already_registered_button');
                document.querySelector(`#form-dev-message`).textContent = i18next.t('register.form_dev_message');
                document.querySelector(`#code-title`).textContent = i18next.t('register.code_title');
                document.querySelector(`#code-plot`).textContent = i18next.t('register.code_plot');
                document.querySelector(`#code-dev-message`).textContent = i18next.t('register.code_dev_message');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}