export default class View {

    static ID = {
        THEME: {
            CHECKBOX: 'theme-checkbox',
        },
        REASONS_SECTIONS: {
            BUTTON: 'reasons-sections-button',
        },
        DO_NOT_HAVE_DREAM_SECTIONS: {
            BUTTON: 'do-not-have-dreams-sections-button',
        },
        HEADER: {
            THEME_IMAGE: 'theme-image',
        },
        FOOTER: {
            TELEGRAM_IMAGE: 'telegram-image',
            LINKEDIN_IMAGE: 'linkedin-image',
            GITHUB_IMAGE: 'github-image',
        }
    }

    static CLASSES = {
        DO_NOT_HAVE_DREAMS_BLOCK: 'do-not-have-dreams-block',
        BODY: {
            HEADER: 'header',
            MAIN: 'main',
            FOOTER: 'footer',
        },
    }

    getHeaderThemeImageElement() {
        return document.querySelector(`#${View.ID.HEADER.THEME_IMAGE}`);
    }

    getFooterTelegramImageElement() {
        return document.querySelector(`#${View.ID.FOOTER.TELEGRAM_IMAGE}`);
    }

    getFooterLinkedinImageElement() {
        return document.querySelector(`#${View.ID.FOOTER.LINKEDIN_IMAGE}`);
    }

    getFooterGithubImageElement() {
        return document.querySelector(`#${View.ID.FOOTER.GITHUB_IMAGE}`);
    }

    getHeaderElement() {
        return document.querySelector(`.${View.CLASSES.BODY.HEADER}`);
    }

    getMainElement() {
        return document.querySelector(`.${View.CLASSES.BODY.MAIN}`);
    }

    getFooterElement() {
        return document.querySelector(`.${View.CLASSES.BODY.FOOTER}`);
    }

    getThemeCheckboxElement() {
        return document.querySelector(`#${View.ID.THEME.CHECKBOX}`);
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