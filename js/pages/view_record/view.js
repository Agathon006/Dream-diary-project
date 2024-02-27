/**
 * view_record page view module.
 * @module js/pages/view_record/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        DREAM_RECORD: {
            TITLE: 'dream-title',
            DATE: 'dream-date',
            VIEWS: 'dream-views',
            LIKES_BUTTON: 'likes-button',
            LIKES_NUMBER: 'dream-likes-number',
            LIKE_ICON: 'dream-like-icon',
            CATEGORY: 'dream-category',
            CATEGORY_SPAN: 'dream-category-span',
            MOOD: 'dream-mood',
            MOOD_SPAN: 'dream-mood-span',
            USER_AVATAR: 'dream-user-avatar',
            USER_NICKNAME: 'dream-user-nickname',
            IMAGE: 'dream-image',
            PLOT: 'dream-plot',
        },
    }

    /**
    Retrieves the element for the dream title
    @returns {Element} The dream title element */
    getDreamTitleElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.TITLE}`);
    }

    /**
    Retrieves the element for the dream date
    @returns {Element} The dream date element */
    getDreamDateElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.DATE}`);
    }

    /**
    Retrieves the element for the dream views
    @returns {Element} The dream views element */
    getDreamViewsElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.VIEWS}`);
    }

    /**
    Retrieves the element for the dream likes button
    @returns {Element} The dream likes button element */
    getDreamLikesButtonElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.LIKES_BUTTON}`);
    }

    /**
    Retrieves the element for the dream likes number
    @returns {Element} The dream likes number element */
    getDreamLikesNumberElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.LIKES_NUMBER}`);
    }

    /**
    Retrieves the element for the dream like icon
    @returns {Element} The dream like icon element */
    getDreamLikeIconElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.LIKE_ICON}`);
    }

    /**
    Retrieves the element for the dream category
    @returns {Element} The dream category element */
    getDreamCategoryElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.CATEGORY}`);
    }

    /**
     * Returns the HTML element for the dream category span
     * @returns {Element} The dream category span element
     */
    getDreamCategorySpanElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.CATEGORY_SPAN}`);
    }

    /**
     * Returns the HTML element for the dream mood input field
     * @returns {Element} The dream mood input field element
     */
    getDreamMoodElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.MOOD}`);
    }

    /**
     * Returns the HTML element for the dream mood span
     * @returns {Element} The dream mood span element
     */
    getDreamMoodSpanElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.MOOD_SPAN}`);
    }

    /**
     * Returns the HTML element for the dream user avatar
     * @returns {Element} The dream user avatar element
     */
    getDreamUserAvatarElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.USER_AVATAR}`);
    }

    /**
     * Returns the HTML element for the dream user nickname
     * @returns {Element} The dream user nickname element
     */
    getDreamUserNicknameElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.USER_NICKNAME}`);
    }

    /**
     * Returns the HTML element for the dream image
     * @returns {Element} The dream image element
     */
    getDreamImageElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.IMAGE}`);
    }

    /**
     * Returns the HTML element for the dream plot input field
     * @returns {Element} The dream plot input field element
     */
    getDreamPlotElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.PLOT}`);
    }

    /**
    Toggles the appearance of an icon based on its source URL.
    @param {HTMLElement} icon - The icon element to toggle. 
    */
    toggleLikesIcon(icon) {
        if (icon.src.match(/_inactive.svg$/)) {
            icon.src = '../icons/like_active.svg';

            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);

        } else {
            icon.src = '../icons/like_inactive.svg';
        };
    }

    /**
    Toggles the waiting-background class of the main element. */
    toggleClassWaitingBackgroundOfMain() {
        document.querySelector('.main').classList.toggle('waiting-background');
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

                document.querySelector(`#return-link`).textContent = i18next.t('view_record.return_link');
                document.querySelector(`#dream-author-span`).textContent = i18next.t('view_record.dream_author_span');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }

}