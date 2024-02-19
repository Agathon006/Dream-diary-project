export default class Controller {
    constructor(view) {
        this.view = view;
        this._updateClocks = this._updateClocks.bind(this);
    }

    init() {
        this._initTranslation();
        this._updateClocks();
        setInterval(this._updateClocks, 1000);
    }

    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

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