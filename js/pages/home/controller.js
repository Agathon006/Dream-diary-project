export default class Controller {
    constructor(view) {
        this.view = view;
    }

    init() {
        this._initChangeThemeCheckboxListener();
        this._initReasonsSectionsButtonListener();
        this._initDoNotHaveDreamSectionsButtonListener();
    }

    _initChangeThemeCheckboxListener() {
        const themesSwitcherCheckbox = this.view.getThemeCheckboxElement(),
            header = this.view.getHeaderElement(),
            main = this.view.getMainElement(),
            footer = this.view.getFooterElement(),
            themeImage = this.view.getHeaderThemeImageElement(),
            telegramImage = this.view.getFooterTelegramImageElement(),
            linkedinImage = this.view.getFooterLinkedinImageElement(),
            githubImage = this.view.getFooterGithubImageElement();

        if (localStorage.getItem('theme') === 'dark') {
            themesSwitcherCheckbox.checked = true;
        } else if (localStorage.getItem('theme') === 'light') {
            themesSwitcherCheckbox.checked = false;
        }

        if (themesSwitcherCheckbox.checked) {
            header.classList.toggle('primary-style');
            main.classList.toggle('secondary-style');
            footer.classList.toggle('primary-style');
            themeImage.src = './icons/header/theme-dark.svg';
            telegramImage.src = './icons/footer/telegram-dark.svg';
            linkedinImage.src = './icons/footer/linkedin-dark.svg';
            githubImage.src = './icons/footer/github-dark.svg';
        } else {
            header.classList.toggle('primary-style-light');
            main.classList.toggle('secondary-style-light');
            footer.classList.toggle('primary-style-light');
            themeImage.src = './icons/header/theme-light.svg';
            telegramImage.src = './icons/footer/telegram-light.svg';
            linkedinImage.src = './icons/footer/linkedin-light.svg';
            githubImage.src = './icons/footer/github-light.svg';
        }

        themesSwitcherCheckbox.addEventListener('change', function () {
            header.classList.toggle('primary-style');
            main.classList.toggle('secondary-style');
            footer.classList.toggle('primary-style');

            header.classList.toggle('primary-style-light');
            main.classList.toggle('secondary-style-light');
            footer.classList.toggle('primary-style-light');

            if (themesSwitcherCheckbox.checked) {
                localStorage.theme = 'dark';
                themeImage.src = './icons/header/theme-dark.svg';
                telegramImage.src = './icons/footer/telegram-dark.svg';
                linkedinImage.src = './icons/footer/linkedin-dark.svg';
                githubImage.src = './icons/footer/github-dark.svg';
            } else {
                localStorage.theme = 'light';
                themeImage.src = './icons/header/theme-light.svg';
                telegramImage.src = './icons/footer/telegram-light.svg';
                linkedinImage.src = './icons/footer/linkedin-light.svg';
                githubImage.src = './icons/footer/github-light.svg';
            }
        });
    }

    _initReasonsSectionsButtonListener() {
        const button = this.view.getReasonsSectionsButtonElement(),
            doNotHaveDreamsBlockElement = this.view.getDoNotHaveDreamsBlockElement();

        button.addEventListener('click', () => {

            window.scrollTo({
                top: doNotHaveDreamsBlockElement.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        });
    }

    _initDoNotHaveDreamSectionsButtonListener() {
        const button = this.view.getDoNotHaveDreamSectionsButtonElement();

        button.addEventListener('click', () => {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}