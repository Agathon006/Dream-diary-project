/**
 * make_record page view module.
 * @module js/pages/make_record/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        RECORD_FORM: {
            FORM: 'record-form',
            DREAM_CATEGORY_SELECT: 'dream-category-select',
            DREAM_CATEGORY_ICON: 'dream-category-icon',
            DREAM_MOOD_SELECT: 'dream-mood-select',
            DREAM_MOOD_ICON: 'dream-mood-icon',
            RECORD_TITLE: 'record-form-title',
            RECORD_PLOT: 'record-form-plot',
            SUBMIT_INPUT: 'record-form-submit',
        },
    }

    static JS_CLASSES = {
        REGISTER_FORM: {
            WRONG_INPUT: 'wrong-input',
            WRONG_SPAN: 'wrong-span',
        },
    }

    getDreamCategorySelectElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_CATEGORY_SELECT}`);
    }

    getDreamCategoryIconElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_CATEGORY_ICON}`);
    }

    getDreamMoodSelectElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_MOOD_SELECT}`);
    }

    getDreamMoodIconElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_MOOD_ICON}`);
    }

    getRecordFormElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.FORM}`);
    }

    getRecordTitleInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.RECORD_TITLE}`);
    }

    getRecordPlotInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.RECORD_PLOT}`);
    }

    getSubmitInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.SUBMIT_INPUT}`);
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

                document.querySelector(`#record-form-image-url-input`).placeholder = i18next.t('make_record.record_form_image_url_placeholder');
                document.querySelector(`#record-form-title-span`).textContent = i18next.t('make_record.record_form_title_span');
                document.querySelector(`#record-form-category-span`).textContent = i18next.t('make_record.record_form_category_span');
                document.querySelector(`#record-form-mood-span`).textContent = i18next.t('make_record.record_form_mood_span');
                document.querySelector(`#dream-category-select`).options[1].textContent = i18next.t('make_record.dream_category_select_option_first');
                document.querySelector(`#dream-category-select`).options[2].textContent = i18next.t('make_record.dream_category_select_option_second');
                document.querySelector(`#dream-category-select`).options[3].textContent = i18next.t('make_record.dream_category_select_option_third');
                document.querySelector(`#dream-category-select`).options[4].textContent = i18next.t('make_record.dream_category_select_option_fourth');
                document.querySelector(`#dream-category-select`).options[5].textContent = i18next.t('make_record.dream_category_select_option_fifth');
                document.querySelector(`#dream-category-select`).options[6].textContent = i18next.t('make_record.dream_category_select_option_sixth');
                document.querySelector(`#dream-mood-select`).options[1].textContent = i18next.t('make_record.dream_mood_select_option_first');
                document.querySelector(`#dream-mood-select`).options[2].textContent = i18next.t('make_record.dream_mood_select_option_second');
                document.querySelector(`#dream-mood-select`).options[3].textContent = i18next.t('make_record.dream_mood_select_option_third');
                document.querySelector(`#dream-mood-select`).options[4].textContent = i18next.t('make_record.dream_mood_select_option_fourth');
                document.querySelector(`#dream-mood-select`).options[5].textContent = i18next.t('make_record.dream_mood_select_option_fifth');
                document.querySelector(`#record-form-plot-span`).textContent = i18next.t('make_record.record_form_plot_span');
                document.querySelector(`#record-form-plot`).placeholder = i18next.t('make_record.record_form_plot_placeholder');
                document.querySelector(`#record-form-tags-span`).textContent = i18next.t('make_record.record_form_tags_span');
                document.querySelector(`#tags-input`).placeholder = i18next.t('make_record.record_form_tags_placeholder');
                document.querySelector(`#record-form-submit`).value = i18next.t('make_record.record_form_submit');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}