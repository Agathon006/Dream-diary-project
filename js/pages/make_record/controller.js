export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initFormListener();
    }

    _initFormListener() {
        const form = this.view.getRecordFormElement();

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            this.view.clearClassWrongInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const formData = new FormData(form);
            const formInfo = Object.fromEntries(formData);

            if (!this._isFormValidationOkay(formInfo)) {
                return;
            }

            const jwt = require('jsonwebtoken');
            const decoedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));

            formInfo.email = decoedJwt.email;

            const currentDate = new Date();
            formInfo.date = {};
            formInfo.date.dayNumber = currentDate.getDate();
            formInfo.date.monthNumber = currentDate.getMonth();
            formInfo.date.year = currentDate.getFullYear();
            formInfo.date.weekNumber = currentDate.getDay();
            formInfo.views = 0;

            console.log(formInfo)

            this._publishDreamRecord(formInfo);

        });
    }

    _isFormValidationOkay(formInfo) {
        const recordTitle = this.view.getRecordTitleInputElement(),
            recordPlot = this.view.getRecordPlotInputElement();

        let isValidationOkay = true;

        if (!this.model.isTitleOkay(formInfo.dreamTitle)) {
            this.view.addClassWrongInput(recordTitle);
            this.view.createWrongSpanElement(recordTitle, "Dream title can't be empty");
            isValidationOkay = false;
        }
        if (!this.model.isPlotOkay(formInfo.dreamPlot)) {
            this.view.addClassWrongInput(recordPlot);
            this.view.createWrongSpanElement(recordPlot, "Dream description must have at least 10 symbols");
            isValidationOkay = false;
        }

        return isValidationOkay;
    }

    _publishDreamRecord(formInfo) {
        const submitButton = this.view.getSubmitInputElement();

        this.model.registerNewRecord(JSON.stringify(formInfo))
            .then((response) => {
                if (!response.ok) {
                    this.view.createWrongSpanElement(submitButton, "Network response was not ok");
                }
                return true;
            })
            .then((response) => {
                console.log('Success')
                window.location.href = "./registered_home.html";
            })
            .catch((error) => {
                this.view.createWrongSpanElement(submitButton, `Something go wrong... ${error}`);
            });
    }
}