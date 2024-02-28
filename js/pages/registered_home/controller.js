/**
 * registered_home page controller module.
 * @module js/pages/registered_home/controller
 */

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
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

    /**
    Initializes the translation based on the user's selected language.
    Calls the view's translatePage method if language is set to 'ru'.
    @function _initTranslation */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
    Initializes the listener for the burger button.
    Toggles the visibility of the burger content based on user interactions.
    @function _initBurgerButtonListener */
    _initBurgerButtonListener() {
        document.querySelector('.body').addEventListener('click', (event) => {
            if (event.target.id === 'burger-button' || event.target.parentNode.id === 'burger-button') {
                document.querySelector('#burger-content').classList.remove('not-exist');
            }
            else if (!event.target.closest('.burger-content-wrapper')) {
                document.querySelector('#burger-content').classList.add('not-exist');
            }
        });
    }

    /**
    Initializes notification functionality for the application.
    Sets up an interaction object to track user interaction and a default interval to check for notifications every minute.
    Listens for click events on the document to track user interaction and adjust notification checking accordingly. */
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

    /**
    Initializes the dream search input element, fetches dream records from the model and displays auto-suggestions based on user input.
    */
    _initDreamSearchInputElement() {
        const dreamSearchInput = this.view.getDreamSearchInputElement(),
            dreamSearchButton = this.view.getDreamSearchButtonElement();

        this.model.getPromisegetDreamRecords()
            .then(response => response.json())
            .then(data => {
                const possibleSuggestions = data.map(record => record.dreamTitle);
                let counter = 0;

                dreamSearchInput.addEventListener('keydown', (event) => {

                    let searchInputValue = dreamSearchInput.value.toLowerCase(),
                        autoSuggestions = this.view.getDreamSearchAutocompleteElement();

                    autoSuggestions.innerHTML = "",
                        counter = 0;

                    for (let i = 0; i < possibleSuggestions.length; i++) {
                        const suggestion = possibleSuggestions[i];
                        if (suggestion.toLowerCase().includes(searchInputValue) && searchInputValue.length > 0) {
                            let suggestionElement = document.createElement("a");
                            suggestionElement.textContent = suggestion;
                            suggestionElement.href = "#";
                            suggestionElement.onclick = function () {
                                dreamSearchInput.value = suggestion;
                                autoSuggestions.style.display = "none";

                                dreamSearchButton.click();
                            };

                            autoSuggestions.appendChild(suggestionElement);
                            counter++;
                        }
                        if (counter === 3) {
                            break;
                        }
                    }

                    if (searchInputValue.length > 0) {
                        autoSuggestions.style.display = "block";
                    } else {
                        autoSuggestions.style.display = "none";
                    }

                    if (event.key === 'Enter') {
                        dreamSearchButton.click();
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    }

    /**
    Initializes the event listener for dream search functionality
    */
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
                                moodSelect.options[moodSelect.selectedIndex].value,
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

    /**
    Initialize the Dream Category listener for the select element and icon element
    */
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

    /**
    Initialize the Dream Mood listener for the select element and icon element
    */
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

    /**
    Initialize the Sort listener for the dream records by likes/views
    */
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

    /**
    Initialize the Main plot listener for the dynamic content in form of dream records accorging to filter and sort
    */
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
                                moodSelect = this.view.getDreamMoodSelectElement(),
                                dreamSortSelect = this.view.getDreamSortSelectElement();

                            this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value, data[0].email);
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

    /**
    Initialize the User Search listener for the user search div element
    */
    _initUserSearchListener() {
        const userSearchDiv = this.view.getUserSearchDivElement();
        userSearchDiv.addEventListener('click', (event) => {
            if (event.target.id === 'user-search-main-button') {
                userSearchDiv.innerHTML = '';

                this.view.clearMainPlotHtml();

                const dreamSearchInput = this.view.getDreamSearchInputElement(),
                    categorySelect = this.view.getDreamCategorySelectElement(),
                    moodSelect = this.view.getDreamMoodSelectElement(),
                    dreamSortSelect = this.view.getDreamSortSelectElement();

                this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value, dreamSortSelect.options[dreamSortSelect.selectedIndex].value);
            }
        });
    }

    /**
    Initialize dream records based on the parameters provided.
    @param {number} [currentPageNumber=1] - The current page number for pagination.
    @param {string} [searchInput=''] - The search input for filtering records.
    @param {string} [dreamCategory='All'] - The category of the dreams to filter.
    @param {string} [dreamMood='All'] - The mood of the dreams to filter.
    @param {string} [sort='Default'] - The sorting option for the records.
    @param {string} [userEmail='All'] - The user email for filtering records. */
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

    /**
    Put a dream record on the main plot with specified data.
    @param {Object} mainPlot - The main plot object where the dream record will be displayed.
    @param {Object} record - The dream record data to be displayed. */
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