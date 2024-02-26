/**
 * moon page view module.
 * @module js/pages/moon/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        FORECAST: {
            PLACE: 'forecast-place',
            MY_PLACE_BUTTON: 'forecast-place-button',
            CONTAINER: 'forecast-container',
        },
        MOON_PHASES: {
            NEW_MOON_DATE: 'new-moon-date',
            GROWING_MOON_DATE: 'growing-moon-date',
            FULL_MOON_DATE: 'full-moon-date',
            WANING_MOON_DATE: 'waning-moon-date',
        },
        NEXT_MOON_PHASES: {
            NEXT_NEW_MOON_DATE: 'next-new-moon-date',
            NEXT_GROWING_MOON_DATE: 'next-growing-moon-date',
            NEXT_FULL_MOON_DATE: 'next-full-moon-date',
            NEXT_WANING_MOON_DATE: 'next-waning-moon-date',
        }
    }

    static JS_CLASSES = {
        MOON_PHASES: {
            DATES_SPANS: 'moon-phase__current-date-span',
        },
        COMMON: {
            HIDDEN: 'hidden',
        },
    }

    /**
     * Get the forecast place element.
     * @returns {Element} The forecast place element.
     */
    getForecastPlaceElement() {
        return document.querySelector(`#${View.ID.FORECAST.PLACE}`);
    }

    /**
     * Get the 'My Place' button element in the forecast.
     * @returns {Element} The 'My Place' button element.
     */
    getMyPlaceButtonElement() {
        return document.querySelector(`#${View.ID.FORECAST.MY_PLACE_BUTTON}`);
    }

    /**
     * Get the forecast container element.
     * @returns {Element} The forecast container element.
     */
    getForecastContainerElement() {
        return document.querySelector(`#${View.ID.FORECAST.CONTAINER}`);
    }

    /**
     * Get the new moon date span element.
     * @returns {Element} The new moon date span element.
     */
    getNewMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.NEW_MOON_DATE}`);
    }

    /**
     * Get the growing moon date span element.
     * @returns {Element} The growing moon date span element.
     */
    getGrowingMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.GROWING_MOON_DATE}`);
    }

    /**
     * Get the full moon date span element.
     * @returns {Element} The full moon date span element.
     */
    getFullMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.FULL_MOON_DATE}`);
    }

    /**
     * Get the waning moon date span element.
     * @returns {Element} The waning moon date span element.
     */
    getWaningDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.WANING_MOON_DATE}`);
    }

    /**
    * Returns the span element for the next new moon date.
    * @returns {Element} The span element for the next new moon date.
    */
    getNextNewMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_NEW_MOON_DATE}`);
    }

    /**
     * Returns the span element for the next growing moon date.
     * @returns {Element} The span element for the next growing moon date.
     */
    getNextGrowingMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_GROWING_MOON_DATE}`);
    }

    /**
     * Returns the span element for the next full moon date.
     * @returns {Element} The span element for the next full moon date.
     */
    getNextFullMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_FULL_MOON_DATE}`);
    }

    /**
     * Returns the span element for the next waning moon date.
     * @returns {Element} The span element for the next waning moon date.
     */
    getNextWaningDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_WANING_MOON_DATE}`);
    }

    /**
     * Returns an array of span elements for the current moon phase dates.
     * @returns {Element[]} An array of span elements for the current moon phase dates.
     */
    getCurrentMoonPhaseDateSpansElements() {
        return document.querySelectorAll(`.${View.JS_CLASSES.MOON_PHASES.DATES_SPANS}`);
    }

    /**
    Changes the color of the specified element based on the cloud cover number.
    @param {HTMLElement} element - The element to change the color of.
    @param {number} number - The cloud cover number.
    @param {HTMLElement} resultElement - The element to display the result text in. */
    whichColorForCloudCover(element, number, resultElement) {
        if (number > 67) {
            element.style.color = 'red';
            resultElement.style.color = 'red';
            if (localStorage.getItem('language') === 'ru') {
                resultElement.innerText = 'Вряд ли';
            } else {
                resultElement.innerText = 'Unlikely';
            }
        } else if (number > 33) {
            element.style.color = 'yellow';
            resultElement.style.color = 'yellow';
            if (localStorage.getItem('language') === 'ru') {
                resultElement.innerText = 'Возможно';
            } else {
                resultElement.innerText = 'Perhaps';
            }
        } else {
            element.style.color = 'rgb(0, 255, 0)';
            resultElement.style.color = 'rgb(0, 255, 0)';
            if (localStorage.getItem('language') === 'ru') {
                resultElement.innerText = 'Скорее всего';
            } else {
                resultElement.innerText = 'Most likely';
            }
        }
    }

    /**
    Toggles the 'hidden' class on the specified element, effectively hiding or showing it.
    @param {Element} element - The element to toggle the 'hidden' class on. */
    toggleClassHidden(element) {
        element.style.transition = 'none';
        element.classList.toggle(View.JS_CLASSES.COMMON.HIDDEN);
    }

    /**
    Toggles the 'waiting-background' class on all elements with the class 'forecast-day'. */
    toggleClassesWaitingBackgroundOfForecastDayElements() {
        document.querySelectorAll('.forecast-day').forEach((element) => {
            element.classList.toggle('waiting-background');
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

                document.querySelector(`#what-causes-title`).textContent = i18next.t('moon.what_causes_title');
                document.querySelector(`#what-causes-plot-first`).textContent = i18next.t('moon.what_causes_plot_first');
                document.querySelector(`#what-causes-plot-second`).textContent = i18next.t('moon.what_causes_plot_second');

                document.querySelector(`#can-you-see-title`).textContent = i18next.t('moon.can_you_see_title');
                document.querySelector(`#forecast-place-button`).textContent = i18next.t('moon.forecast_place_button');
                document.querySelector(`#cloud-cover-span-first`).textContent = i18next.t('moon.cloud_cover_span');
                document.querySelector(`#cloud-cover-span-second`).textContent = i18next.t('moon.cloud_cover_span');
                document.querySelector(`#cloud-cover-span-third`).textContent = i18next.t('moon.cloud_cover_span');
                document.querySelector(`#cloud-cover-span-fourth`).textContent = i18next.t('moon.cloud_cover_span');
                document.querySelector(`#cloud-cover-span-fifth`).textContent = i18next.t('moon.cloud_cover_span');

                document.querySelector(`#current-moon-title`).textContent = i18next.t('moon.current_moon_title');
                document.querySelector(`#current-moon-new`).textContent = i18next.t('moon.moon_new');
                document.querySelector(`#current-moon-growing`).textContent = i18next.t('moon.moon_growing');
                document.querySelector(`#current-moon-full`).textContent = i18next.t('moon.moon_full');
                document.querySelector(`#current-moon-waning`).textContent = i18next.t('moon.moon_waning');

                document.querySelector(`#next-moon-title`).textContent = i18next.t('moon.next_moon_title');
                document.querySelector(`#next-moon-new`).textContent = i18next.t('moon.moon_new');
                document.querySelector(`#next-moon-growing`).textContent = i18next.t('moon.moon_growing');
                document.querySelector(`#next-moon-full`).textContent = i18next.t('moon.moon_full');
                document.querySelector(`#next-moon-waning`).textContent = i18next.t('moon.moon_waning');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }

}