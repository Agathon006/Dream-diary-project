export default class View {

    static ID = {
        REASONS_SECTIONS: {
            BUTTON: 'reasons-sections-button',
        },
        DO_NOT_HAVE_DREAM_SECTIONS: {
            BUTTON: 'do-not-have-dreams-sections-button',
        },
    }

    static CLASSES = {
        DO_NOT_HAVE_DREAMS_BLOCK: 'do-not-have-dreams-block',
    }

    getReasonsSectionsButtonElement() {
        return document.querySelector(`#${View.ID.REASONS_SECTIONS.BUTTON}`);
    }

    getDoNotHaveDreamsBlockElement() {
        return document.querySelector(`.${View.CLASSES.DO_NOT_HAVE_DREAMS_BLOCK}`);
    }

    getDoNotHaveDreamSectionsButtonElement() {
        return document.querySelector(`#${View.ID.DO_NOT_HAVE_DREAM_SECTIONS.BUTTON}`);
    }
}