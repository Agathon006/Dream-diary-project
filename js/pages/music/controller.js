export default class Controller {
    constructor(view) {
        this.view = view;
    }

    init() {
        this._initTranslation();
    }

    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }
}