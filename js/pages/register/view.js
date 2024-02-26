/**
 * register page view module.
 * @module js/pages/register/view
 */

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

    /**
    Returns the register form element.
    @returns {HTMLElement} The register form element. */
    getRegistrerFormElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.FORM}`);
    }

    /**
    Returns the nickname input element.
    @returns {HTMLElement} The nickname input element. */
    getNicknameInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.NICKNAME_INPUT}`);
    }

    /**
    Returns the email input element.
    @returns {HTMLElement} The email input element. */
    getEmailInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.EMAIL_INPUT}`);
    }

    /**
    Returns the password input element.
    @returns {HTMLElement} The password input element. */
    getPasswordInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.PASSWORD_INPUT}`);
    }

    /**
    Returns the password checkbox input element.
    @returns {HTMLElement} The password checkbox input element. */
    getPassworCheckBoxInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.PASSWORD_CHECKBOX_INPUT}`);
    }

    /**
    Returns the submit input element.
    @returns {HTMLElement} The submit input element. */
    getSubmitInputElement() {
        return document.querySelector(`#${View.ID.REGISTER_FORM.SUBMIT_INPUT}`);
    }

    /**
    Get the form element for the code.
    @returns {Element} The form element for the code. */
    getCodeFormElement() {
        return document.querySelector(`#${View.ID.CODE_FORM.FORM}`);
    }

    /**
    Get all number input elements in the code form.
    @returns {NodeList} All number input elements in the code form. */
    getCodeFormNumberInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.CODE_FORM.NUMBER}`);
    }

    /**
    Get the development message element.
    @returns {Element} The development message element. */
    getDevMessageElement() {
        return document.querySelector(`#${View.ID.DEV_MESSAGE.FORM}`);
    }

    /**
    Get the development message code element.
    @returns {Element} The development message code element. */
    getDevMessageCodeElement() {
        return document.querySelector(`#${View.ID.DEV_MESSAGE.CODE}`);
    }

    /**
    Remove the hidden class from an element.
    @param {Element} element - The element to remove the hidden class from. */
    removeClassHidden(element) {
        element.classList.remove(View.JS_CLASSES.COMMON.HIDDEN);
    }

    /**
    Add the wrong input class to an element.
    @param {Element} element - The element to add the wrong input class to. */
    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    /**
    Add the right input class to an element.
    @param {Element} element - The element to add the right input class to. */
    addClassRightInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
    }

    /**
    Remove the wrong input class from an element.
    @param {Element} element - The element to remove the wrong input class from. */
    removeClassWrongInput(element) {
        element.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    /**
    Removes the class for right input from the element
    @param {HTMLElement} element - The element to remove the class from */
    removeClassRightInput(element) {
        element.classList.remove(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
    }

    /**
    Creates a warning span element with the given message and adds it before the specified element
    @param {HTMLElement} element - The element before which the warning span will be added
    @param {string} message - The message to be displayed in the warning span */
    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    /**
    Adds the class for right input to elements that are not marked as wrong input */
    addClassRightToNotWrongElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.INPUT}`).forEach(element => {
            if (!element.classList.contains(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT)) {
                element.classList.add(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
            }
        });
    }

    /**
    Removes classes 'wrong_input' and 'right_input' from input elements
    that belong to the register form. */
    clearClassWrongAndRightInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.RIGHT_INPUT);
        });
    }

    /**
    Removes elements with class 'wrong_span' from the register form. */
    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }

    /**
    Translates the page content between English and Russian using data from a dictionary JSON file.
    */
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