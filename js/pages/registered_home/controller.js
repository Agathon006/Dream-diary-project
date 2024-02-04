import { data } from "jquery";

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initDreamCategoryListener();
        this._initDreamMoodListener();
        this._initMainPlotListener();
        this._initDreamRecords();
    }

    _initDreamCategoryListener() {
        const dreamCategorySelect = this.view.getDreamCategorySelectElement(),
            dreamCategoryIcon = this.view.getDreamCategoryIconElement();

        dreamCategorySelect.addEventListener("change", (event) => {
            switch (event.target.value) {
                case 'Usual':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/usual.svg'
                    break;
                case 'Just talking':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/just_talking.svg'
                    break;
                case 'Nightmare':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/nightmare.svg'
                    break;
                case 'Action':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/action.svg'
                    break;
                case 'Trash':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/trash.svg'
                    break;
                case 'Conscious dream':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/conscious_dream.svg'
                    break;
                default:
                    console.log('No such option in select dream category')
            }
        });
    }

    _initDreamMoodListener() {
        const dreamMoodSelect = this.view.getDreamMoodSelectElement(),
            dreamMoodIcon = this.view.getDreamMoodIconElement();

        dreamMoodSelect.addEventListener("change", (event) => {
            switch (event.target.value) {
                case 'Typical dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/typical_dream.svg'
                    break;
                case 'Fun dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/fun_dream.svg'
                    break;
                case 'Sad dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/sad_dream.svg'
                    break;
                case 'Terrible':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/terrible.svg'
                    break;
                case 'Made me think':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/made_me_think.svg'
                    break;
                default:
                    console.log('No such option in select dream category')
            }
        });
    }

    _initMainPlotListener() {
        const mainPlot = this.view.getMainPlotElement();
        mainPlot.addEventListener('click', (event) => {
            const currentPage = this.view.getCurrentPageNumber();
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