/**
 * registered_home page view module.
 * @module js/pages/registered_home/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        MAIN: {
            NOTIFICATION_BLOCK: 'notification',
            PREV_BUTTON: 'pagination-switcher-button-prev',
            NEXT_BUTTON: 'pagination-switcher-button-next',
            CURRENT_PAGE_NUMBER: 'current-page-number',
            MAIN_PLOT: 'main-plot',
        },
        FILTER: {
            DREAM_SEARCH_INPUT: 'dream-search-input',
            DREAM_SEARCH_AUTOCOMPLETE: 'auto-suggestions',
            DREAM_SEARCH_BUTTON: 'dream-search-button',
            DREAM_CATEGORY_SELECT: 'dream-category-select',
            DREAM_CATEGORY_ICON: 'dream-category-icon',
            DREAM_MOOD_SELECT: 'dream-mood-select',
            DREAM_MOOD_ICON: 'dream-mood-icon',
            DREAM_SORT_SELECT: 'dream-sort-select',
            DREAM_SORT_ICON: 'dream-sort-icon',
            USER_SEARCH_DIV: 'user-search-div',
        },
    }

    /**
    Returns the notification block element
    @returns {Element} The notification block element */
    getNotificationBlockElement() {
        return document.querySelector(`#${View.ID.MAIN.NOTIFICATION_BLOCK}`);
    }

    /**
    Returns the dream search input element
    @returns {Element} The dream search input element */
    getDreamSearchInputElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SEARCH_INPUT}`);
    }

    /**
    Returns the dream search autocomplete element
    @returns {Element} The dream search autocomplete element */
    getDreamSearchAutocompleteElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SEARCH_AUTOCOMPLETE}`);
    }

    /**
    Returns the dream search button element
    @returns {Element} The dream search button element */
    getDreamSearchButtonElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SEARCH_BUTTON}`);
    }

    /**
    Returns the dream category select element
    @returns {Element} The dream category select element */
    getDreamCategorySelectElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_CATEGORY_SELECT}`);
    }

    /**
    Returns the dream category icon element
    @returns {Element} The dream category icon element */
    getDreamCategoryIconElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_CATEGORY_ICON}`);
    }

    /**
    Finds and returns the dream mood select element from the DOM.
    @returns {Element} The dream mood select element. */
    getDreamMoodSelectElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_MOOD_SELECT}`);
    }

    /**
    Finds and returns the dream mood icon element from the DOM.
    @returns {Element} The dream mood icon element. */
    getDreamMoodIconElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_MOOD_ICON}`);
    }

    /**
    Finds and returns the dream sort select element from the DOM.
    @returns {Element} The dream sort select element. */
    getDreamSortSelectElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SORT_SELECT}`);
    }

    /**
    Finds and returns the dream sort icon element from the DOM.
    @returns {Element} The dream sort icon element. */
    getDreamSortIconElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SORT_ICON}`);
    }

    /**
    Finds and returns the current page number element from the DOM.
    @returns {Element} The current page number element. */
    getCurrentPageNumberElement() {
        return document.querySelector(`#${View.ID.MAIN.CURRENT_PAGE_NUMBER}`);
    }

    /**
    Finds and returns the previous button element from the DOM.
    @returns {Element} The previous button element. */
    getPrevButton() {
        return document.querySelector(`#${View.ID.MAIN.PREV_BUTTON}`);
    }

    /**
    Finds and returns the next button element from the DOM.
    @returns {Element} The next button element. */
    getNextButton() {
        return document.querySelector(`#${View.ID.MAIN.NEXT_BUTTON}`);
    }

    /**
    Finds and returns the main plot element from the DOM.
    @returns {Element} The main plot element. */
    getMainPlotElement() {
        return document.querySelector(`#${View.ID.MAIN.MAIN_PLOT}`);
    }

    /**
    Retrieves the user search div element from the DOM.
    @returns {Element|null} The user search div element if found, or null if not found. */
    getUserSearchDivElement() {
        return document.querySelector(`#${View.ID.FILTER.USER_SEARCH_DIV}`);
    }

    /**
    Clears the main plot HTML content and adds waiting background class. */
    clearMainPlotHtml() {
        const mainPlot = this.getMainPlotElement();
        mainPlot.innerHTML = ``;
        this.toggleClassWaitingBackgroundOfMain();
    }

    /**
    Adds the 'hidden' class to the specified element.
    @param {Element} element - The element to add the 'hidden' class to. */
    addClassHidden(element) {
        element.classList.add('hidden');
    }

    /**
    Removes the 'hidden' class from the specified element.
    @param {Element} element - The element to remove the 'hidden' class from. */
    removeClassHidden(element) {
        element.classList.remove('hidden');
    }

    /**
    Display a message when there are no records to show based on the selected language.
    @param {HTMLElement} mainPlot - The main plot element where the message will be displayed. */
    displayNoRecordsMessage(mainPlot) {
        if (localStorage.getItem('language') === 'ru') {
            mainPlot.innerHTML +=
                `<div class="empty-message">
                    <span class="empty-message__span">Таких снов нет. Попробуйте изменить фильтры или поисковый запрос.</span>
                    <button class="empty-message__button" id="empty-message-button">ОЧИСТИТЬ ПОИСК</button>
                </div>`;
        } else {
            mainPlot.innerHTML +=
                `<div class="empty-message">
                    <span class="empty-message__span">There are no such dreams. Try to change the filters or the search query.</span>
                    <button class="empty-message__button" id="empty-message-button">CLEAR SEARCH</button>
                </div>`;
        }
    }

    /**
    Displays simple pagination based on the selected language and number of dreams
    @param {HTMLElement} mainPlot - The element where the pagination will be displayed
    @param {number} dreamsNumber - The number of dreams to determine the content of pagination */
    displaySimplePagination(mainPlot, dreamsNumber) {
        if (localStorage.getItem('language') === 'ru') {
            let dynamicContent = '';
            if (dreamsNumber === 1) {
                dynamicContent = 'сон';
            } else if (dreamsNumber % 10 === 1 && dreamsNumber % 100 !== 11) {
                dynamicContent = 'сон';
            } else if (dreamsNumber % 10 >= 2 && dreamsNumber % 10 <= 4 && (dreamsNumber % 100 < 10 || dreamsNumber % 100 >= 20)) {
                dynamicContent = 'сна';
            } else {
                dynamicContent = 'снов';
            }
            mainPlot.innerHTML +=
                `<div class="pagination-switcher">
                <button class="pagination-switcher__button hidden"><</button>
                    <div class="pagination-switcher__plot">
                        <div class="pagination-switcher__plot-top">
                            <span class="pagination-switcher__plot-text">Найдено: </span>
                            <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                            <span class="pagination-switcher__plot-text"> ${dynamicContent}</span>
                        </div>
                    </div>
                    <button class="pagination-switcher__button hidden"><</button>
                </div>`
        } else {
            let dynamicContent = '';
            dreamsNumber === 1 ? dynamicContent = 'dream' : dynamicContent = 'dreams';
            mainPlot.innerHTML +=
                `<div class="pagination-switcher">
                <button class="pagination-switcher__button hidden"><</button>
                    <div class="pagination-switcher__plot">
                        <div class="pagination-switcher__plot-top">
                            <span class="pagination-switcher__plot-text">Found: </span>
                            <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                            <span class="pagination-switcher__plot-text"> ${dynamicContent}</span>
                        </div>
                    </div>
                    <button class="pagination-switcher__button hidden"><</button>
                </div>`
        }
    }

    /**
    Display pagination based on the current language and dream count
    @param {HTMLElement} mainPlot - The main element to display pagination in
    @param {number} dreamsNumber - The number of dreams to display
    @param {number} currentPageNumber - The current page number being displayed
    @param {number} pagesNumber - The total number of pages available */
    displayPagination(mainPlot, dreamsNumber, currentPageNumber, pagesNumber) {
        if (localStorage.getItem('language') === 'ru') {
            let dynamicContent = '';
            if (dreamsNumber === 1) {
                dynamicContent = 'сон';
            } else if (dreamsNumber % 10 === 1 && dreamsNumber % 100 !== 11) {
                dynamicContent = 'сон';
            } else if (dreamsNumber % 10 >= 2 && dreamsNumber % 10 <= 4 && (dreamsNumber % 100 < 10 || dreamsNumber % 100 >= 20)) {
                dynamicContent = 'сна';
            } else {
                dynamicContent = 'снов';
            }
            mainPlot.innerHTML +=
                `<div class="pagination-switcher">
                    <button class="pagination-switcher__button hidden" id="pagination-switcher-button-prev"><</button>
                    <div class="pagination-switcher__plot">
                        <div class="pagination-switcher__plot-top">
                            <span class="pagination-switcher__plot-text">Найдено: </span>
                            <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                            <span class="pagination-switcher__plot-text"> ${dynamicContent}</span>
                        </div>
                        <div class="pagination-switcher__plot-bottom">
                            <span class="pagination-switcher__plot-text">Страница </span>
                            <span class="pagination-switcher__plot-key" id="current-page-number">${currentPageNumber}</span>
                            <span class="pagination-switcher__plot-text"> из </span>
                            <span class="pagination-switcher__plot-key">${pagesNumber}</span>
                        </div>
                    </div>
                    <button class="pagination-switcher__button" id="pagination-switcher-button-next">></button>
                </div>`
        } else {
            let dynamicContent = '';
            dreamsNumber === 1 ? dynamicContent = 'dream' : dynamicContent = 'dreams';
            mainPlot.innerHTML +=
                `<div class="pagination-switcher">
                    <button class="pagination-switcher__button hidden" id="pagination-switcher-button-prev"><</button>
                    <div class="pagination-switcher__plot">
                        <div class="pagination-switcher__plot-top">
                            <span class="pagination-switcher__plot-text">Found: </span>
                            <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                            <span class="pagination-switcher__plot-text"> ${dynamicContent}</span>
                        </div>
                        <div class="pagination-switcher__plot-bottom">
                            <span class="pagination-switcher__plot-text">Page </span>
                            <span class="pagination-switcher__plot-key" id="current-page-number">${currentPageNumber}</span>
                            <span class="pagination-switcher__plot-text"> of </span>
                            <span class="pagination-switcher__plot-key">${pagesNumber}</span>
                        </div>
                    </div>
                    <button class="pagination-switcher__button" id="pagination-switcher-button-next">></button>
                </div>`
        }
    }

    /**
    Display the dream record on the webpage
    @param {HTMLElement} mainPlot - The element where the dream record will be displayed
    @param {Object} record - The dream record data
    @param {string} dreamCategoryIcon - The icon representing the dream category
    @param {string} dreamCategoryIconDescription - Description of the dream category icon
    @param {string} dreamMoodIcon - The icon representing the dream mood
    @param {string} dreamMoodIconDescription - Description of the dream mood icon
    @param {string} monthName - The name of the month when the dream occurred
    @param {string} weekDay - The day of the week when the dream occurred
    @param {string} avatarUrl - The URL of the user's avatar
    @param {string} nickname - The user's nickname
    @param {string} id - The unique ID of the dream record
    @param {string} likedThis - Indicates if the user has liked this dream record */
    displayDreamRecord(mainPlot, record, dreamCategoryIcon, dreamCategoryIconDescription, dreamMoodIcon, dreamMoodIconDescription, monthName, weekDay, avatarUrl, nickname, id, likedThis) {
        var dynamicTagContent = '',
            likesSpan = '';

        record.dreamTags.forEach(tagName => {
            dynamicTagContent += `<button class="dream-record__main-middle-tags-button">${tagName}</button>`;
        });


        if (localStorage.getItem('language') === 'ru') {

            if (record.likes === 1) {
                likesSpan = 'лайк';
            } else if (record.likes % 10 === 1 && record.likes % 100 !== 11) {
                likesSpan = 'лайк';
            } else if (record.likes % 10 >= 2 && record.likes % 10 <= 4 && (record.likes % 100 < 10 || record.likes % 100 >= 20)) {
                likesSpan = 'лайка';
            } else {
                likesSpan = 'лайков';
            }

            mainPlot.innerHTML += `<div class="dream-record">
            <div class="dream-record__visual">
                <img src="${record.dreamImageUrl}" alt=""
                    class="dream-record__visual-primary">
                     <div class="dream-record__visual-secondary">
                    <div class="image-wrapper">
                      <img src=${dreamCategoryIcon} alt="dream category" help="xui"
                        class="dream-record__visual-secondary-icon">
                        <div class="description-label">${dreamCategoryIconDescription}</div>
                      </div>
                      <div class="image-wrapper">
                         <img src=${dreamMoodIcon} alt="dream mood"
                        class="dream-record__visual-secondary-icon">
                        <div class="description-label">${dreamMoodIconDescription}</div>
                      </div>
                </div>
            </div>
            <div class="dream-record__main">
                <div class="dream-record__main-top">
                    <div class="dream-record__main-top-left">
                        <h2 class="dream-record__main-top-left-title">${record.dreamTitle}</h2>
                        <h3 class="dream-record__main-top-left-date">
                        ${record.date.dayNumber} 
                        ${this.translateMonthToRu(monthName)} 
                        ${record.date.year} 
                        (${this.translateWeekDayToRu(weekDay)})
                        </h3>
                    </div>
                    <div class="dream-record__main-top-right">
                        <span class="dream-record__main-top-right-likes">${record.likes} ${likesSpan}</span>
                        ${likedThis}
                        <span class="dream-record__main-top-right-views">${record.views} просмотров</span>
                    </div>
                </div>
                <div class="dream-record__main-middle">
                    <div class="dream-record__main-middle-tags">${dynamicTagContent}</div>
                    <p class="dream-record__main-middle-plot">${record.dreamPlot}</p>
                </div>
                <div class="dream-record__main-bottom">
                    <button class="dream-record__main-bottom-user">
                        <img src="${avatarUrl}" alt="" class="dream-record__main-bottom-user-avatar">
                        <span>${nickname}</span>
                    </button>
                    <a href="#" data-id=${id} class="dream-record__main-bottom-look-link" id="dream-record-main-bottom-look-link">Посмотреть</a>
                </div>
            </div>
        </div>`
        } else {

            record.likes === 1 ? likesSpan = 'like' : likesSpan = 'likes';

            mainPlot.innerHTML += `<div class="dream-record">
            <div class="dream-record__visual">
                <img src="${record.dreamImageUrl}" alt=""
                    class="dream-record__visual-primary">
                     <div class="dream-record__visual-secondary">
                    <div class="image-wrapper">
                      <img src=${dreamCategoryIcon} alt="dream category" help="xui"
                        class="dream-record__visual-secondary-icon">
                        <div class="description-label">${dreamCategoryIconDescription}</div>
                      </div>
                      <div class="image-wrapper">
                         <img src=${dreamMoodIcon} alt="dream mood"
                        class="dream-record__visual-secondary-icon">
                        <div class="description-label">${dreamMoodIconDescription}</div>
                      </div>
                </div>
            </div>
            <div class="dream-record__main">
                <div class="dream-record__main-top">
                    <div class="dream-record__main-top-left">
                        <h2 class="dream-record__main-top-left-title">${record.dreamTitle}</h2>
                        <h3 class="dream-record__main-top-left-date">
                        ${record.date.dayNumber} 
                        ${monthName} 
                        ${record.date.year} 
                        (${weekDay})
                        </h3>
                    </div>
                    <div class="dream-record__main-top-right">
                        <span class="dream-record__main-top-right-likes">${record.likes} ${likesSpan}</span>
                        ${likedThis}
                        <span class="dream-record__main-top-right-views">${record.views} views</span>
                    </div>
                </div>
                <div class="dream-record__main-middle">
                    <div class="dream-record__main-middle-tags">${dynamicTagContent}</div>
                    <p class="dream-record__main-middle-plot">${record.dreamPlot}</p>
                </div>
                <div class="dream-record__main-bottom">
                    <button class="dream-record__main-bottom-user">
                        <img src="${avatarUrl}" alt="" class="dream-record__main-bottom-user-avatar">
                        <span>${nickname}</span>
                    </button>
                    <a href="#" data-id=${id} class="dream-record__main-bottom-look-link" id="dream-record-main-bottom-look-link">Look</a>
                </div>
            </div>
        </div>`
        }
    }

    /**
    Translates the month from English to Russian.
    @param {string} month - The month in English (e.g. 'January').
    @returns {string} - The month translated to Russian (e.g. 'Января'). */
    translateMonthToRu(month) {
        switch (month) {
            case 'January':
                return 'Января';
            case 'February':
                return 'Февраля';
            case 'March':
                return 'Марта';
            case 'April':
                return 'Апреля';
            case 'May':
                return 'Мая';
            case 'June':
                return 'Июня';
            case 'July':
                return 'Июля';
            case 'August':
                return 'Августа';
            case 'September':
                return 'Сентября';
            case 'October':
                return 'Октября';
            case 'November':
                return 'Ноября';
            case 'December':
                return 'Декабря';
            default:
                return '???';
        }
    }

    /**
    Translates the week day from English to Russian.
    @param {string} weekDay - The week day in English (e.g. 'Monday').
    @returns {string} - The week day translated to Russian (e.g. 'Понедельник'). */
    translateWeekDayToRu(weekDay) {
        switch (weekDay) {
            case 'Monday':
                return 'Понедельник';
            case 'Tuesday':
                return 'Вторник';
            case 'Wednesday':
                return 'Среда';
            case 'Thursday':
                return 'Четверг';
            case 'Friday':
                return 'Пятница';
            case 'Saturday':
                return 'Суббота';
            case 'Sunday':
                return 'Воскресенье';
            default:
                return '???';
        }
    }

    /**
    Displays the user filter based on the user's avatar URL and nickname,
    considering the language stored in the localStorage.
    @param {string} userAvatarUrl - The URL of the user's avatar.
    @param {string} userNickname - The user's nickname. */
    displayUserFilter(userAvatarUrl, userNickname) {
        const userSearchDiv = this.getUserSearchDivElement();
        if (localStorage.getItem('language') === 'ru') {
            userSearchDiv.innerHTML =
                `<div class="main__filter-block user-search">
                    <span class="user-search__title">Сны пользователя</span>
                    <div class="user-search__main">
                        <div class="user-search__main-left">
                            <img src=${userAvatarUrl} alt="user avatar"
                                class="user-search__main-left-avatar">
                                <span class="user-search__main-left-nickname">${userNickname}</span>
                        </div>
                        <button class="user-search__main-button" id="user-search-main-button">x</button>
                    </div>
                </div>`
        } else {
            userSearchDiv.innerHTML =
                `<div class="main__filter-block user-search">
                    <span class="user-search__title">Dreams of user</span>
                    <div class="user-search__main">
                        <div class="user-search__main-left">
                            <img src=${userAvatarUrl} alt="user avatar"
                                class="user-search__main-left-avatar">
                                <span class="user-search__main-left-nickname">${userNickname}</span>
                        </div>
                        <button class="user-search__main-button" id="user-search-main-button">x</button>
                    </div>
                </div>`
        }
    }

    /**
    Toggles the 'waiting-background' class on the '.main' element,
    which is used to apply styling for waiting/loading state. */
    toggleClassWaitingBackgroundOfMain() {
        document.querySelector('.main').classList.toggle('waiting-background');
    }

    /**
    Translates the page content between English and Russian using data from a dictionary JSON file.
    */
    translatePage() {
        fetch('../dictionary.json')
            .then(response => response.json())
            .then(data => {
                i18next.init({
                    lng: 'ru',
                    debug: false,
                    resources: {
                        ru: {
                            translation: data
                        }
                    }
                });

                document.querySelector(`#header-link-home`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-moon`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-music`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#header-link-home-burger`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time-burger`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-moon-burger`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-music-burger`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile-burger`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out-burger`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#notification`).innerHTML = `
                    <p>${i18next.t('registered_home.notification')}<img src="../icons/like_active.svg" alt="heart"></p>
                `;

                document.querySelector(`#filter-search-span`).textContent = i18next.t('registered_home.filter_search_span');
                document.querySelector(`#filter-category-span`).textContent = i18next.t('registered_home.filter_category_span');
                document.querySelector(`#filter-mood-span`).textContent = i18next.t('registered_home.filter_moon_span');
                document.querySelector(`#filter-sort-span`).textContent = i18next.t('registered_home.filter_sort_span');
                document.querySelector(`#dream-category-select`).options[0].textContent = i18next.t('registered_home.dream_category_select_option_first');
                document.querySelector(`#dream-category-select`).options[1].textContent = i18next.t('registered_home.dream_category_select_option_second');
                document.querySelector(`#dream-category-select`).options[2].textContent = i18next.t('registered_home.dream_category_select_option_third');
                document.querySelector(`#dream-category-select`).options[3].textContent = i18next.t('registered_home.dream_category_select_option_fourth');
                document.querySelector(`#dream-category-select`).options[4].textContent = i18next.t('registered_home.dream_category_select_option_fifth');
                document.querySelector(`#dream-category-select`).options[5].textContent = i18next.t('registered_home.dream_category_select_option_sixth');
                document.querySelector(`#dream-category-select`).options[6].textContent = i18next.t('registered_home.dream_category_select_option_seventh');
                document.querySelector(`#dream-mood-select`).options[0].textContent = i18next.t('registered_home.dream_mood_select_option_first');
                document.querySelector(`#dream-mood-select`).options[1].textContent = i18next.t('registered_home.dream_mood_select_option_second');
                document.querySelector(`#dream-mood-select`).options[2].textContent = i18next.t('registered_home.dream_mood_select_option_third');
                document.querySelector(`#dream-mood-select`).options[3].textContent = i18next.t('registered_home.dream_mood_select_option_fourth');
                document.querySelector(`#dream-mood-select`).options[4].textContent = i18next.t('registered_home.dream_mood_select_option_fifth');
                document.querySelector(`#dream-mood-select`).options[5].textContent = i18next.t('registered_home.dream_mood_select_option_sixth');
                document.querySelector(`#dream-sort-select`).options[0].textContent = i18next.t('registered_home.dream_sort_select_option_first');
                document.querySelector(`#dream-sort-select`).options[1].textContent = i18next.t('registered_home.dream_sort_select_option_second');
                document.querySelector(`#dream-sort-select`).options[2].textContent = i18next.t('registered_home.dream_sort_select_option_third');
                document.querySelector(`#share-dream-link`).textContent = i18next.t('registered_home.share_dream_link');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}
