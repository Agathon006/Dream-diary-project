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

    /**
    Gets the select element for dream category from the document
    @returns {HTMLElement} The select element for dream category */
    getDreamCategorySelectElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_CATEGORY_SELECT}`);
    }

    /**
    Gets the icon element for dream category from the document
    @returns {HTMLElement} The icon element for dream category */
    getDreamCategoryIconElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_CATEGORY_ICON}`);
    }

    /**
    Gets the select element for dream mood from the document
    @returns {HTMLElement} The select element for dream mood */
    getDreamMoodSelectElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_MOOD_SELECT}`);
    }

    /**
    Gets the icon element for dream mood from the document
    @returns {HTMLElement} The icon element for dream mood */
    getDreamMoodIconElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_MOOD_ICON}`);
    }

    /**
    Gets the form element for record from the document
    @returns {HTMLElement} The form element for record */
    getRecordFormElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.FORM}`);
    }

    /**
    Gets the input element for record title from the document
    @returns {HTMLElement} The input element for record title */
    getRecordTitleInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.RECORD_TITLE}`);
    }

    /**
    Retrieves the record plot input element from the document.
    @returns {HTMLElement} The record plot input element. */
    getRecordPlotInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.RECORD_PLOT}`);
    }

    /**
    Retrieves the submit input element from the document.
    @returns {HTMLElement} The submit input element. */
    getSubmitInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.SUBMIT_INPUT}`);
    }

    /**
    Adds a class to the provided element to indicate a wrong input.
    @param {HTMLElement} element - The element to add the class to. */
    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    /**
    Creates a span element with a warning message and inserts it after the provided element.
    @param {HTMLElement} element - The element to insert the warning span after.
    @param {string} message - The warning message to display. */
    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    /**
    Clears the wrong input class from all elements in the document. */
    clearClassWrongInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
        });
    }

    /**
    Removes all elements with the wrong span class from the document.
    @function clearClassWrongSpanFromElements */
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