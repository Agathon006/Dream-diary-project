/**
 * music page controller module.
 * @module js/pages/music/controller
 */

export default class Controller {
    constructor(view) {
        this.view = view;
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
    }

    /**
    Initializes the translation based on the user's selected language.
    Calls the view's translatePage method if language is set to 'ru'.
    @function _initTranslation */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
    Initializes the listener for the burger button.
    Toggles the visibility of the burger content based on user interactions.
    @function _initBurgerButtonListener */
    _initBurgerButtonListener() {
        document.querySelector('.body').addEventListener('click', (event) => {
            if (event.target.id === 'burger-button' || event.target.parentNode.id === 'burger-button') {
                document.querySelector('#burger-content').classList.remove('not-exist');
            }
            else if (!event.target.closest('.burger-content-wrapper')) {
                document.querySelector('#burger-content').classList.add('not-exist');
            }
        });
    }
}