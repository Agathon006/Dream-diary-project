
/**
 * home controller module.
 * @module js/pages/home/controller
 */

export default class Controller {
    constructor(view) {
        this.view = view;
    }
    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
        this._initReasonsSectionsButtonListener();
        this._initDoNotHaveDreamSectionsButtonListener();
    }

    /**
    Initializes translation based on the language stored in localStorage. */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
    Initializes a listener for the burger button to toggle the visibility of the burger menu. */
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

    /**
    Initializes the listener for the Reasons Sections Button. When clicked, it scrolls
    to the 'Do Not Have Dreams' block element on the page.
    */
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

    /**
    Initializes the event listener for the "Do Not Have Dream Sections" button.
    When the button is clicked, the page scrolls to the bottom smoothly.
    */
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