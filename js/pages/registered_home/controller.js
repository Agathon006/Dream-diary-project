export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initNotification();
        this._initDreamSearchInputElement();
        this._initDreamSearchListener();
        this._initDreamCategoryListener();
        this._initDreamMoodListener();
        this._initSortListener();
        this._initMainPlotListener();
        this._initUserSearchListener();
        this._initDreamRecords();
    }

    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    _initNotification() {
        var interaction = {
            interacted: false
        };

        var defaultInterval = setInterval(() => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();

            if (hours === 22 && minutes === 0) {
                const notification = this.view.getNotificationBlockElement();
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
            }
        }, 60000);

        document.addEventListener('click', () => {
            interaction.interacted = true;
            clearInterval(defaultInterval);

            setInterval(() => {
                const currentTime = new Date();
                const hours = currentTime.getHours();
                const minutes = currentTime.getMinutes();

                if (hours === 22 && minutes === 0) {
                    const notification = this.view.getNotificationBlockElement();

                    if (notification.style.display !== 'block') {
                        notification.style.display = 'block';

                        const sound = new Audio('../audio/notification.mp3');
                        sound.play();

                        setTimeout(() => {
                            notification.style.display = 'none';
                        }, 5000);
                    }

                }
            }, 60000);
        });
    }

    _initDreamSearchInputElement() {
        const dreamSearchInput = this.view.getDreamSearchInputElement();
        dreamSearchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {

                this.view.clearMainPlotHtml();

                const categorySelect = this.view.getDreamCategorySelectElement(),
                    moodSelect = this.view.getDreamMoodSelectElement();

                const userSearchDiv = this.view.getUserSearchDivElement();
                try {
                    const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                    this.model.getPromiseGetUserByNickname(userNickname)
                        .then(response => response.json())
                        .then(data => {
                            if (data.length) {
                                this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[moodSelect.selectedIndex].value,
                                    moodSelect.options[moodSelect.selectedIndex].value, data[0].email);
                            } else {
                                console.log('User not found');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
                catch {
                    this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[moodSelect.selectedIndex].value,
                        moodSelect.options[moodSelect.selectedIndex].value);
                }
            }
        });
    }

    _initDreamSearchListener() {
        const dreamSearchInput = this.view.getDreamSearchInputElement(),
            dreamSearchButton = this.view.getDreamSearchButtonElement();

        dreamSearchButton.addEventListener('click', () => {

            this.view.clearMainPlotHtml();

            const categorySelect = this.view.getDreamCategorySelectElement(),
                moodSelect = this.view.getDreamMoodSelectElement(),
                dreamSortSelect = this.view.getDreamSortSelectElement();

            const userSearchDiv = this.view.getUserSearchDivElement();
            try {
                const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                this.model.getPromiseGetUserByNickname(userNickname)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length) {
                            this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[moodSelect.selectedIndex].value,
                                moodSelect.options[moodSelect.selectedIndex].value, data[0].email,
                                dreamSortSelect.options[dreamSortSelect.selectedIndex].value, data[0].email);
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            catch {
                this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[moodSelect.selectedIndex].value,
                    moodSelect.options[moodSelect.selectedIndex].value,
                    dreamSortSelect.options[dreamSortSelect.selectedIndex].value);
            }
        });
    }

    _initDreamCategoryListener() {
        const dreamCategorySelect = this.view.getDreamCategorySelectElement(),
            dreamCategoryIcon = this.view.getDreamCategoryIconElement();

        dreamCategorySelect.addEventListener('change', (event) => {
            switch (event.target.value) {
                case 'All':
                    dreamCategoryIcon.src = '../icons/make_record/dream_mood/select.svg';
                    break;
                case 'Usual':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/usual.svg';
                    break;
                case 'Just talking':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/just_talking.svg';
                    break;
                case 'Nightmare':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/nightmare.svg';
                    break;
                case 'Action':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/action.svg';
                    break;
                case 'Trash':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/trash.svg';
                    break;
                case 'Conscious dream':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/conscious_dream.svg';
                    break;
                default:
                    console.log('No such option in select dream category');
            }

            this.view.clearMainPlotHtml();


            const dreamSearchInput = this.view.getDreamSearchInputElement(),
                moodSelect = this.view.getDreamMoodSelectElement(),
                dreamSortSelect = this.view.getDreamSortSelectElement();

            const userSearchDiv = this.view.getUserSearchDivElement();
            try {
                const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                this.model.getPromiseGetUserByNickname(userNickname)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length) {
                            this._initDreamRecords(1, dreamSearchInput.value, event.target.value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value, data[0].email);
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            catch {
                this._initDreamRecords(1, dreamSearchInput.value, event.target.value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value);
            }
        });
    }

    _initDreamMoodListener() {
        const dreamMoodSelect = this.view.getDreamMoodSelectElement(),
            dreamMoodIcon = this.view.getDreamMoodIconElement();

        dreamMoodSelect.addEventListener("change", (event) => {
            switch (event.target.value) {
                case 'All':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/select.svg';
                    break;
                case 'Typical dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/typical_dream.svg';
                    break;
                case 'Fun dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/fun_dream.svg';
                    break;
                case 'Sad dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/sad_dream.svg';
                    break;
                case 'Terrible':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/terrible.svg';
                    break;
                case 'Made me think':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/made_me_think.svg';
                    break;
                default:
                    console.log('No such option in select dream category');
            }

            this.view.clearMainPlotHtml();

            const dreamSearchInput = this.view.getDreamSearchInputElement(),
                categorySelect = this.view.getDreamCategorySelectElement(),
                dreamSortSelect = this.view.getDreamSortSelectElement();

            const userSearchDiv = this.view.getUserSearchDivElement();
            try {
                const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                this.model.getPromiseGetUserByNickname(userNickname)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length) {
                            this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, event.target.value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value, data[0].email);
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            catch {
                this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, event.target.value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value);
            }
        });
    }

    _initSortListener() {
        const dreamSortSelect = this.view.getDreamSortSelectElement(),
            dreamSortIcon = this.view.getDreamSortIconElement();

        dreamSortSelect.addEventListener("change", (event) => {
            switch (event.target.value) {
                case 'Default':
                    dreamSortIcon.src = '../icons/make_record/dream_mood/select.svg';
                    break;
                case 'likes':
                    dreamSortIcon.src = '../icons/like_active.svg';
                    break;
                case 'views':
                    dreamSortIcon.src = '../icons/view.svg';
                    break;
                default:
                    console.log('No such option in select sort');
            }

            this.view.clearMainPlotHtml();

            const dreamSearchInput = this.view.getDreamSearchInputElement(),
                categorySelect = this.view.getDreamCategorySelectElement(),
                moodSelect = this.view.getDreamMoodSelectElement();

            const userSearchDiv = this.view.getUserSearchDivElement();
            try {
                const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                this.model.getPromiseGetUserByNickname(userNickname)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length) {
                            this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, event.target.value, data[0].email);
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            catch {
                this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, event.target.value);
            }
        });
    }


    _initMainPlotListener() {
        const mainPlot = this.view.getMainPlotElement();
        mainPlot.addEventListener('click', (event) => {
            const currentPage = this.view.getCurrentPageNumberElement();
            if (event.target.id === 'pagination-switcher-button-next') {
                this.view.clearMainPlotHtml();

                const dreamSearchInput = this.view.getDreamSearchInputElement(),
                    categorySelect = this.view.getDreamCategorySelectElement(),
                    moodSelect = this.view.getDreamMoodSelectElement(),
                    dreamSortSelect = this.view.getDreamSortSelectElement();

                const userSearchDiv = this.view.getUserSearchDivElement();
                try {
                    const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                    this.model.getPromiseGetUserByNickname(userNickname)
                        .then(response => response.json())
                        .then(data => {
                            if (data.length) {
                                this._initDreamRecords((+currentPage.innerText) + 1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value, data[0].email);
                            } else {
                                console.log('User not found');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
                catch {
                    this._initDreamRecords((+currentPage.innerText) + 1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value);
                }
            };
            if (event.target.id === 'pagination-switcher-button-prev') {
                this.view.clearMainPlotHtml();

                const dreamSearchInput = this.view.getDreamSearchInputElement(),
                    categorySelect = this.view.getDreamCategorySelectElement(),
                    moodSelect = this.view.getDreamMoodSelectElement(),
                    dreamSortSelect = this.view.getDreamSortSelectElement();

                const userSearchDiv = this.view.getUserSearchDivElement();
                try {
                    const userNickname = userSearchDiv.children[0].children[1].children[0].children[1].innerText;
                    this.model.getPromiseGetUserByNickname(userNickname)
                        .then(response => response.json())
                        .then(data => {
                            if (data.length) {
                                this._initDreamRecords((+currentPage.innerText) - 1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value, data[0].email);
                            } else {
                                console.log('User not found');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
                catch {
                    this._initDreamRecords((+currentPage.innerText) - 1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value);
                }
            };
            if (event.target.id === 'empty-message-button') {
                this.view.clearMainPlotHtml();
                const dreamSearchInput = this.view.getDreamSearchInputElement(),
                    dreamCategorySelect = this.view.getDreamCategorySelectElement(),
                    dreamCategoryIcon = this.view.getDreamCategoryIconElement(),
                    dreamMoodSelect = this.view.getDreamMoodSelectElement(),
                    dreamMoodIcon = this.view.getDreamMoodIconElement(),
                    dreamSortSelect = this.view.getDreamSortSelectElement(),
                    dreamSortIcon = this.view.getDreamSortIconElement(),
                    userSearchDiv = this.view.getUserSearchDivElement();

                dreamSearchInput.value = '';

                dreamCategorySelect.value = 'All';
                dreamCategoryIcon.src = '../icons/make_record/dream_mood/select.svg';

                dreamMoodSelect.value = 'All';
                dreamMoodIcon.src = '../icons/make_record/dream_mood/select.svg';

                dreamSortSelect.value = 'Default';
                dreamSortIcon.src = '../icons/make_record/dream_mood/select.svg';

                userSearchDiv.innerHTML = '';

                this._initDreamRecords();
            };
            if (event.target.parentElement.classList.contains('dream-record__main-bottom-user')) {
                const userUrl = event.target.parentElement.children[0].src;
                const userNickname = event.target.parentElement.children[1].innerText;
                this.view.displayUserFilter(userUrl, userNickname);

                this.model.getPromiseGetUserByNickname(userNickname)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length) {

                            this.view.clearMainPlotHtml();

                            const dreamSearchInput = this.view.getDreamSearchInputElement(),
                                categorySelect = this.view.getDreamCategorySelectElement(),
                                moodSelect = this.view.getDreamMoodSelectElement();
                            this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, data[0].email);
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };
            if (event.target.id === 'dream-record-main-bottom-look-link') {
                const recordId = event.target.getAttribute('data-id');
                localStorage.dreamRecordID = recordId;
                window.location.href = "./view_record.html";
            }
        });
    }

    _initUserSearchListener() {
        const userSearchDiv = this.view.getUserSearchDivElement();
        userSearchDiv.addEventListener('click', (event) => {
            if (event.target.id === 'user-search-main-button') {
                userSearchDiv.innerHTML = '';

                this.view.clearMainPlotHtml();

                const dreamSearchInput = this.view.getDreamSearchInputElement(),
                    categorySelect = this.view.getDreamCategorySelectElement(),
                    moodSelect = this.view.getDreamMoodSelectElement();
                this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value);
            }
        });
    }

    _initDreamRecords(currentPageNumber = 1, searchInput = '', dreamCategory = 'All', dreamMood = 'All', sort = 'Default', userEmail = 'All') {
        const mainPlot = this.view.getMainPlotElement();

        this.model.getPromiseGetDreamRecords(currentPageNumber, searchInput, dreamCategory, dreamMood, sort, userEmail)
            .then(response => {
                if (!response.ok) {
                    console.log('Error...');
                }
                return response.json();
            })
            .then(records => {
                if (!records.pages) {
                    this.view.toggleClassWaitingBackgroundOfMain();
                    this.view.displayNoRecordsMessage(mainPlot);
                } else {
                    async function setupPagination(mainPlot, currentPageNumber, records, view) {
                        if (records.pages === 1) {
                            view.displaySimplePagination(mainPlot, records.items);
                        } else {
                            view.displayPagination(mainPlot, records.items, currentPageNumber, records.pages);
                            if (currentPageNumber > 1) {
                                const prevButton = view.getPrevButton();
                                view.removeClassHidden(prevButton);
                            };
                            if (currentPageNumber === records.pages) {
                                const nextButton = view.getNextButton();
                                view.addClassHidden(nextButton);
                            }
                        }
                    }
                    setupPagination(mainPlot, currentPageNumber, records, this.view)
                        .then(() => {
                            records.data.forEach((record, index) => {
                                this._putDreamRecord(mainPlot, record);
                            });
                        });
                    this.view.toggleClassWaitingBackgroundOfMain();
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
                        dreamCategoryIconDescription = record.dreamCategory,
                        dreamMoodIcon = this.model.whichDreamMoodIcon(record.dreamMood),
                        dreamMoodIconDescription = record.dreamMood,
                        monthName = this.model.whichMonthNameByNumber(record.date.monthNumber),
                        weekDay = this.model.whichWeekDayNameByNumber(record.date.weekNumber);
                    let likedThis = '';
                    if (record.likesUsersEmails.includes(record.email)) {
                        if (localStorage.getItem('language') === 'ru') {
                            likedThis = '<span class="dream-record__main-top-right-liked-this">Вам понравилось</span>';
                        } else {
                            likedThis = '<span class="dream-record__main-top-right-liked-this">You liked this</span>';
                        }
                    };
                    this.view.displayDreamRecord(mainPlot, record, dreamCategoryIcon, dreamCategoryIconDescription, dreamMoodIcon, dreamMoodIconDescription, monthName, weekDay, data[0].avatar, data[0].nickname, record.id, likedThis);
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}