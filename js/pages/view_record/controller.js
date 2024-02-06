export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initDreamRecord();
    }

    _initDreamRecord() {
        const recordId = localStorage.getItem('dreamRecordID'),
            dreamTitle = this.view.getDreamTitleElement(),
            dreamDate = this.view.getDreamDateElement(),
            dreamViews = this.view.getDreamViewsElement(),
            dreamCategory = this.view.getDreamCategoryElement(),
            dreamCategorySpan = this.view.getDreamCategorySpanElement(),
            dreamMood = this.view.getDreamMoodElement(),
            dreamMoodSpan = this.view.getDreamMoodSpanElement(),
            dreamUserAvatar = this.view.getDreamUserAvatarElement(),
            dreamUserNickname = this.view.getDreamUserNicknameElement(),
            dreamImage = this.view.getDreamImageElement(),
            dreamPlot = this.view.getDreamPlotElement();

        this.model.getPromiseGetDreamRecords(recordId)
            .then(response => {
                if (!response.ok) {
                    console.log('Error...');
                }
                return response.json();
            })
            .then(record => {
                console.log(record);
                dreamTitle.innerText = record.dreamTitle;
                dreamDate.innerText = `Dreamed ${record.date.dayNumber} ${this.model.whichMonthNameByNumber(record.date.monthNumber)} ${record.date.year}`;
                dreamViews.innerText = `${record.views} views`;
                dreamCategory.src = this.model.whichDreamCategoryIcon(record.dreamCategory);
                dreamCategorySpan.innerText = record.dreamCategory;
                dreamMood.src = this.model.whichDreamMoodIcon(record.dreamMood);
                dreamMoodSpan.innerText = record.dreamMood;
                dreamImage.src = record.dreamImageUrl;
                dreamPlot.innerText = record.dreamPlot;
                this.model.getPromiseGetUserByEmail(record.email)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length) {
                            dreamUserAvatar.src = data[0].avatar;
                            dreamUserNickname.innerText = data[0].nickname;
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error during getting record', error);
            });
    }
}