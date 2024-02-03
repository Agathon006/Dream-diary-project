export default class View {

    static ID = {
        MAIN: {
            PREV_BUTTON: 'pagination-switcher-button-prev',
            NEXT_BUTTON: 'pagination-switcher-button-next',
            CURRENT_PAGE_NUMBER: 'current-page-number',
            MAIN_PLOT: 'main-plot',
        },
    }

    // static JS_CLASSES = {
    //     COMMON: {
    //         HIDDEN: 'hidden',
    //     },
    // }

    getCurrentPageNumber() {
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
                <button class="empty-message__button">CLEAR SEARCH</button>
            </div>`;
    }

    displaySimplePagination(mainPlot, dreamsNumber) {
        mainPlot.innerHTML +=
            `<div class="pagination-switcher">
            <button class="pagination-switcher__button hidden"><</button>
                <div class="pagination-switcher__plot">
                    <div class="pagination-switcher__plot-top">
                        <span class="pagination-switcher__plot-text">Found: </span>
                        <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                        <span class="pagination-switcher__plot-text"> dreams</span>
                    </div>
                </div>
                <button class="pagination-switcher__button hidden"><</button>
            </div>`
    }

    displayPagination(mainPlot, dreamsNumber, currentPageNumber, pagesNumber) {
        mainPlot.innerHTML +=
            `<div class="pagination-switcher">
                <button class="pagination-switcher__button hidden" id="pagination-switcher-button-prev"><</button>
                <div class="pagination-switcher__plot">
                    <div class="pagination-switcher__plot-top">
                        <span class="pagination-switcher__plot-text">Found: </span>
                        <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                        <span class="pagination-switcher__plot-text"> dreams</span>
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
}