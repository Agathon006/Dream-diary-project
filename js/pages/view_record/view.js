export default class View {

    static ID = {
        DREAM_RECORD: {
            TITLE: 'dream-title',
            DATE: 'dream-date',
            VIEWS: 'dream-views',
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
    
}