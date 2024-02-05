export default class View {

    static ID = {
        MAIN: {
            PREV_BUTTON: 'pagination-switcher-button-prev',
            NEXT_BUTTON: 'pagination-switcher-button-next',
            CURRENT_PAGE_NUMBER: 'current-page-number',
            MAIN_PLOT: 'main-plot',
        },
        FILTER: {
            DREAM_SEARCH_INPUT: 'dream-search-input',
            DREAM_SEARCH_BUTTON: 'dream-search-button',
            DREAM_CATEGORY_SELECT: 'dream-category-select',
            DREAM_CATEGORY_ICON: 'dream-category-icon',
            DREAM_MOOD_SELECT: 'dream-mood-select',
            DREAM_MOOD_ICON: 'dream-mood-icon',
            USER_SEARCH_DIV: 'user-search-div',
        },
    }

    getDreamSearchInputElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SEARCH_INPUT}`);
    }

    getDreamSearchButtonElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_SEARCH_BUTTON}`);
    }

    getDreamCategorySelectElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_CATEGORY_SELECT}`);
    }

    getDreamCategoryIconElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_CATEGORY_ICON}`);
    }

    getDreamMoodSelectElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_MOOD_SELECT}`);
    }

    getDreamMoodIconElement() {
        return document.querySelector(`#${View.ID.FILTER.DREAM_MOOD_ICON}`);
    }

    getCurrentPageNumberElement() {
        return document.querySelector(`#${View.ID.MAIN.CURRENT_PAGE_NUMBER}`);
    }

    getPrevButton() {
        return document.querySelector(`#${View.ID.MAIN.PREV_BUTTON}`);
    }

    getNextButton() {
        return document.querySelector(`#${View.ID.MAIN.NEXT_BUTTON}`);
    }

    getMainPlotElement() {
        return document.querySelector(`#${View.ID.MAIN.MAIN_PLOT}`);
    }
    
    getUserSearchDivElement() {
        return document.querySelector(`#${View.ID.FILTER.USER_SEARCH_DIV}`);
    }

    clearMainPlotHtml() {
        const mainPlot = this.getMainPlotElement();
        mainPlot.innerHTML = ``;
    }

    addClassHidden(element) {
        element.classList.add('hidden');
    }

    removeClassHidden(element) {
        element.classList.remove('hidden');
    }

    displayNoRecordsMessage(mainPlot) {
        mainPlot.innerHTML +=
            `<div class="empty-message">
                <span class="empty-message__span">There are no such records. Try to change the filters or the search query.</span>
                <button class="empty-message__button" id="empty-message-button">CLEAR SEARCH</button>
            </div>`;
    }

    displaySimplePagination(mainPlot, dreamsNumber) {
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

    displayPagination(mainPlot, dreamsNumber, currentPageNumber, pagesNumber) {
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

    displayDreamRecord(mainPlot, record, dreamCategoryIcon, dreamCategoryIconDescription, dreamMoodIcon, dreamMoodIconDescription, monthName, weekDay, avatarUrl, nickname) {
        var dynamicContent = "";

        record.dreamTags.forEach(tagName => {
            dynamicContent += `<button class="dream-record__main-middle-tags-button">${tagName}</button>`;
        });

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
                    <span class="dream-record__main-top-right-views">${record.views} views</span>
                </div>
            </div>
            <div class="dream-record__main-middle">
                <div class="dream-record__main-middle-tags">${dynamicContent}</div>
                <p class="dream-record__main-middle-plot">${record.dreamPlot}</p>
            </div>
            <div class="dream-record__main-bottom">
                <button class="dream-record__main-bottom-user">
                    <img src="${avatarUrl}" alt="" class="dream-record__main-bottom-user-avatar">
                    <span>${nickname}</span>
                </button>
                <a href="#" class="dream-record__main-bottom-look-link">Look</a>
            </div>
        </div>
    </div>`
    }

    displayUserFilter(userAvatarUrl, userNickname) {
        const userSearchDiv = this.getUserSearchDivElement();
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
    }
}
