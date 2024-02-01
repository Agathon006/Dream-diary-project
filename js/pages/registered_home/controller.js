export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initDreamRecords();
    }

    _initDreamRecords() {
        const mainPlot = this.view.getMainPlotElement();

        this.model.getPromiseGetDreamRecords()
            .then(response => {
                if (!response.ok) {
                    console.log('Error...');
                }
                return response.json();
            })
            .then(records => {
                records.forEach((record, index) => {
                    this._putDreamRecord(mainPlot, record);
                });
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
                    this.view.displayDreamRecord(mainPlot, record, dreamCategoryIcon, dreamCategoryIconDescription, dreamMoodIcon, dreamMoodIconDescription, monthName, weekDay, data[0].nickname);
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}