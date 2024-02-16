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

}