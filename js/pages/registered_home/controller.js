import { data } from "jquery";

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initMainPlotListener();
        this._initDreamRecords();
    }

    _initMainPlotListener() {
        const mainPlot = this.view.getMainPlotElement();
        mainPlot.addEventListener('click', (event) => {
            console.log(event.target);
            const currentPage = this.view.getCurrentPageNumber();
            console.log(currentPage.innerText);
            if (event.target.id === 'pagination-switcher-button-next') {
                this.view.clearMainPlotHtml();
                this._initDreamRecords((+currentPage.innerText) + 1);
            };
            if (event.target.id === 'pagination-switcher-button-prev') {
                this.view.clearMainPlotHtml();
                this._initDreamRecords((+currentPage.innerText) - 1);
            };
        });
    }

    _initDreamRecords(currentPageNumber = 1) {
        const mainPlot = this.view.getMainPlotElement();

        this.model.getPromiseGetDreamRecords(currentPageNumber)
            .then(response => {
                if (!response.ok) {
                    console.log('Error...');
                }
                return response.json();
            })
            .then(records => {
                console.log(records);
                if (!records.pages) {
                    this.view.displayNoRecordsMessage(mainPlot);
                } else {
                    if (records.pages === 1) {
                        this.view.displaySimplePagination(mainPlot, records.items);
                    } else {
                        this.view.displayPagination(mainPlot, records.items, currentPageNumber, records.pages);
                        if (currentPageNumber > 1) {
                            const prevButton = this.view.getPrevButton();
                            this.view.removeClassHidden(prevButton);
                        };
                        if (currentPageNumber === records.pages) {
                            const nextButton = this.view.getNextButton();
                            this.view.addClassHidden(nextButton);
                        }
                    }

                    records.data.forEach((record, index) => {
                        this._putDreamRecord(mainPlot, record);
                    });
                }
            })
            .catch(error => {
                console.error('Error during getting records', error);
            });
    }

    _putDreamRecord(mainPlot, record) {
        this.model.getPromiseGetUserByEmail(record.email)
            .then(response => response.json())
            .then(data => {
                if (data.length) {
                    const dreamCategoryIcon = this.model.whichDreamCategoryIcon(record.dreamCategory),
                        dreamCategoryIconDescription = this.model.whichDreamCategoryIconDescription(record.dreamCategory),
                        dreamMoodIcon = this.model.whichDreamMoodIcon(record.dreamMood),
                        dreamMoodIconDescription = this.model.whichDreamMoodIconDescription(record.dreamMood),
                        monthName = this.model.whichMonthNameByNumber(record.date.monthNumber),
                        weekDay = this.model.whichWeekDayNameByNumber(record.date.weekNumber);
                    this.view.displayDreamRecord(mainPlot, record, dreamCategoryIcon, dreamCategoryIconDescription, dreamMoodIcon, dreamMoodIconDescription, monthName, weekDay, data[0].avatar, data[0].nickname);
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}