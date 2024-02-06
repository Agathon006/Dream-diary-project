export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initDreamRecord();
        this._initLikeButtonListener();
    }

    _initDreamRecord() {
        const recordId = localStorage.getItem('dreamRecordID'),
            dreamTitle = this.view.getDreamTitleElement(),
            dreamDate = this.view.getDreamDateElement(),
            dreamViews = this.view.getDreamViewsElement(),
            dreamLikesNumber = this.view.getDreamLikesNumberElement(),
            dreamLikesIcon = this.view.getDreamLikeIconElement(),
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
                const newViewsNumber = record.views + 1;
                this.model.getPromiseChangeRecordViews(recordId, newViewsNumber)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update views on dream');
                        }
                        return response.json();
                    })
                    .then(record => {
                        dreamTitle.innerText = record.dreamTitle;
                        dreamDate.innerText = `Dreamed ${record.date.dayNumber} ${this.model.whichMonthNameByNumber(record.date.monthNumber)} ${record.date.year}`;
                        dreamViews.innerText = `${record.views} views`;
                        dreamLikesNumber.innerText = record.likes;

                        const jwt = require('jsonwebtoken');
                        const decodedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));
                        if (record.likesUsersEmails.includes(decodedJwt.email)) {
                            this.view.toggleLikesIcon(dreamLikesIcon);
                        }

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
                        console.error('Error updating views on dream:', error);
                    });
            })
            .catch(error => {
                console.error('Error during getting record', error);
            });
    }

    _initLikeButtonListener() {
        const recordId = localStorage.getItem('dreamRecordID'),
            dreamLikesButton = this.view.getDreamLikesButtonElement(),
            dreamLikesNumber = this.view.getDreamLikesNumberElement(),
            dreamLikesIcon = this.view.getDreamLikeIconElement();

        const jwt = require('jsonwebtoken');
        const decodedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));

        dreamLikesButton.addEventListener('click', () => {

            this.model.getPromiseGetDreamRecords(recordId)
                .then(response => {
                    if (!response.ok) {
                        console.log('Error...');
                    }
                    return response.json();
                })
                .then(record => {
                    let newLikesNumber = record.likes,
                        newLikesUserEmails = record.likesUsersEmails;

                    if (dreamLikesIcon.src.match(/_inactive.svg$/)) {
                        newLikesNumber += 1;
                        newLikesUserEmails.push(decodedJwt.email);
                    } else {
                        newLikesNumber -= 1;
                        newLikesUserEmails.splice(newLikesUserEmails.indexOf(decodedJwt.email), 1);
                    }

                    this.model.getPromiseChangeRecordLikesAndLikesUsers(record.id, newLikesNumber, newLikesUserEmails)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to update views on dream');
                            }
                            return response.json();
                        })
                        .then(record => {
                            dreamLikesNumber.innerText = record.likes;
                            this.view.toggleLikesIcon(dreamLikesIcon);
                        })
                        .catch(error => {
                            console.error('Error updating views on dream:', error);
                        });
                })
                .catch(error => {
                    console.error('Error updating views on dream:', error);
                });
        })
    }
}