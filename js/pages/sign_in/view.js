/**
 * sign_in page view module.
 * @module js/pages/sign_in/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        REGISTER_FORM: {
            FORM: 'register-form',
            EMAIL_INPUT: 'email-input',
            PASSWORD_INPUT: 'password-input',
            PASSWORD_CHECKBOX_INPUT: 'password-check-box',
            SUBMIT_INPUT: 'register-form-submit',
        },
    }

    static JS_CLASSES = {
        REGISTER_FORM: {
            WRONG_INPUT: 'wrong-input',
            RIGHT_INPUT: 'right-input',
            WRONG_SPAN: 'wrong-span',
            INPUT: 'register-form__input',
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

    getPassworCheckBoxInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.PASSWORD_CHECKBOX_INPUT}`);
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

                document.querySelector(`#form-title`).textContent = i18next.t('sign_in.form_title');
                document.querySelector(`#form-password-span`).textContent = i18next.t('sign_in.form_password_span');
                document.querySelector(`#form-show-password-span`).textContent = i18next.t('sign_in.form_show_password_span');
                document.querySelector(`#register-form-submit`).value = i18next.t('sign_in.form_submit');
                document.querySelector(`#not-registered-span`).textContent = i18next.t('sign_in.not_registered_span');
                document.querySelector(`#not-registered-button`).textContent = i18next.t('sign_in.not_registered_button');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}