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
                    console.log(record, index);
                    mainPlot.innerHTML += `<div class="dream-record">
                    <div class="dream-record__visual">
                        <img src="${this.model.replaceWithDefaultIfNotExist(record.dreamImageUrl)}" alt="dream image"
                            class="dream-record__visual-primary">
                        <div class="dream-record__visual-secondary">
                    <img src=${this.model.whichDreamCategoryIcon(record.dreamCategory)} alt="dream category"
                                class="dream-record__visual-secondary-icon">
                        <img src=${this.model.whichDreamMoodIcon(record.dreamMood)} alt="dream mood"
                                class="dream-record__visual-secondary-icon">
                        </div>
                    </div>
                    <div class="dream-record__main">
                        <div class="dream-record__main-top">
                            <div class="dream-record__main-top-left">
                                <h2 class="dream-record__main-top-left-title">${record.dreamTitle}</h2>
                                <h3 class="dream-record__main-top-left-date">
                                ${record.date.dayNumber} 
                                ${this.model.whichMonthNameByNumber(record.date.monthNumber)} 
                                ${record.date.year} 
                                (${this.model.whichWeekDayNameByNumber(record.date.weekNumber)})
                                </h3>
                            </div>
                            <div class="dream-record__main-top-right">
                                <span class="dream-record__main-top-right-views">${record.views} views</span>
                            </div>
                        </div>
                        <div class="dream-record__main-middle">
                            <div class="dream-record__main-middle-tags">
                                <button class="dream-record__main-middle-tags-button">Tag1</button>
                                <button class="dream-record__main-middle-tags-button">Tag2</button>
                                <button class="dream-record__main-middle-tags-button">Tag3</button>
                            </div>
                            <p class="dream-record__main-middle-plot">${record.dreamPlot}{</p>
                        </div>
                        <div class="dream-record__main-bottom">
                            <button class="dream-record__main-bottom-user">Some user</button>
                            <a href="#" class="dream-record__main-bottom-look-link">Look</a>
                        </div>
                    </div>
                </div>`
                });
            })
            .catch(error => {
                console.error('Error during getting records', error);
            });
    }
}