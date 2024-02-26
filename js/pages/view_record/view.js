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

    getDreamTitleElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.TITLE}`);
    }

    getDreamDateElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.DATE}`);
    }

    getDreamViewsElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.VIEWS}`);
    }

    getDreamLikesButtonElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.LIKES_BUTTON}`);
    }

    getDreamLikesNumberElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.LIKES_NUMBER}`);
    }

    getDreamLikeIconElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.LIKE_ICON}`);
    }

    getDreamCategoryElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.CATEGORY}`);
    }

    getDreamCategorySpanElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.CATEGORY_SPAN}`);
    }

    getDreamMoodElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.MOOD}`);
    }

    getDreamMoodSpanElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.MOOD_SPAN}`);
    }

    getDreamUserAvatarElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.USER_AVATAR}`);
    }

    getDreamUserNicknameElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.USER_NICKNAME}`);
    }

    getDreamImageElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.IMAGE}`);
    }

    getDreamPlotElement() {
        return document.querySelector(`#${View.ID.DREAM_RECORD.PLOT}`);
    }

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

                document.querySelector(`#return-link`).textContent = i18next.t('view_record.return_link');
                document.querySelector(`#dream-author-span`).textContent = i18next.t('view_record.dream_author_span');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }

}