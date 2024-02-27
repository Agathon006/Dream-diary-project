/**
 * time page controller module.
 * @module js/pages/time/controller
 */

export default class Controller {
    constructor(view) {
        this.view = view;
        this._updateClocks = this._updateClocks.bind(this);
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
        this._updateClocks();
        setInterval(this._updateClocks, 1000);
    }

    /**
     * Initializes translation based on the stored language preference.
     * If the stored language is Russian ('ru'), it translates the page using the view's translatePage method.
     */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
     * Initializes a click event listener for the burger button to control the burger content visibility.
     * Toggles the visibility of the burger content based on the target click and the element's classes.
     */
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
    Update the clocks with the current time
    */
    _updateClocks() {

        const currentDate = new Date();

        const hours = currentDate.getHours(),
            minutes = currentDate.getMinutes(),
            seconds = currentDate.getSeconds();

        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        this.view.transformCurrentClock(hours, minutes, seconds);
        this.view.transformCurrentSubtitle(currentDate, options);

        this.view.transformNewYorkClock(hours, minutes, seconds);
        this.view.transformNewYorkSubtitle(currentDate, options);

        this.view.transformLondonClock(hours, minutes, seconds);
        this.view.transformLondonSubtitle(currentDate, options);

        this.view.transformTokyoClock(hours, minutes, seconds);
        this.view.transformTokyoSubtitle(currentDate, options);

        this.view.transformBerlinClock(hours, minutes, seconds);
        this.view.transformBerlinSubtitle(currentDate, options);

        this.view.transformChinaClock(hours, minutes, seconds);
        this.view.transformChinaSubtitle(currentDate, options);

        this.view.transformSydneyClock(hours, minutes, seconds);
        this.view.transformSydneySubtitle(currentDate, options);

        this.view.transformCaliforniaClock(hours, minutes, seconds);
        this.view.transformCaliforniaSubtitle(currentDate, options);

        this.view.transformIndiaClock(hours, minutes, seconds);
        this.view.transformIndiaSubtitle(currentDate, options);
    };

}