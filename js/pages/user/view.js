/**
 * user page view module.
 * @module js/pages/user/view
 */

import i18next from 'i18next';

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
            GET_RANDOM_URL_BUTTON: 'get-random-url-button',
            NAME: 'name-input',
            SURNAME: 'surname-input',
            BIRTH_DATE: 'datepicker',
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

    getRrofileGetRandomUrlButtonElement() {
        return document.querySelector(`#${View.ID.PROFILE.GET_RANDOM_URL_BUTTON}`);
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

    toggleClassWaitingBackgroundOfMain() {
        document.querySelector('.main').classList.toggle('waiting-background');
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

                document.querySelector(`#header-link-home`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-moon`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-music`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#header-link-home-burger`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time-burger`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-moon-burger`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-music-burger`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile-burger`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out-burger`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#profile-nickname-span`).textContent = i18next.t('user.profile_nickname_span');
                document.querySelector(`#nickname-input`).placeholder = i18next.t('user.profile_nickname_placeholder');
                document.querySelector(`#password-span`).textContent = i18next.t('user.profile_password_span');
                document.querySelector(`#repeat-password-span`).textContent = i18next.t('user.repeat_password_span');
                document.querySelector(`#avatar-url-input`).placeholder = i18next.t('user.avatar_url_input');
                document.querySelector(`#password-edit-button`).textContent = i18next.t('user.password_edit_button');
                document.querySelector(`#show-password-span`).textContent = i18next.t('user.show_password_span');
                document.querySelector(`#get-random-url-button`).textContent = i18next.t('user.get_random_url_button');
                document.querySelector(`#profile-name-span`).textContent = i18next.t('user.profile_name_span');
                document.querySelector(`#name-input`).placeholder = i18next.t('user.profile_name_placeholder');
                document.querySelector(`#profile-surname-span`).textContent = i18next.t('user.profile_surname_span');
                document.querySelector(`#surname-input`).placeholder = i18next.t('user.profile_surname_placeholder');
                document.querySelector(`#profile-birth-date-span`).textContent = i18next.t('user.profile_birth_date_span');
                document.querySelector(`#datepicker`).placeholder = i18next.t('user.profile_birth_date_placeholder');
                document.querySelector(`#profile-about-me-span`).textContent = i18next.t('user.profile_about_me_span');
                document.querySelector(`#about-input`).placeholder = i18next.t('user.profile_about_me_placeholder');
                document.querySelector(`#profile-edit-button`).textContent = i18next.t('user.profile_edit_button');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}