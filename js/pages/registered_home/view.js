export default class View {

    static ID = {
        MAIN: {
            MAIN_PLOT: 'main-plot',
        },
    }

    // static JS_CLASSES = {
    //     COMMON: {
    //         HIDDEN: 'hidden',
    //     },
    // }

    getMainPlotElement() {
        return document.querySelector(`#${View.ID.MAIN.MAIN_PLOT}`);
    }

    displayDreamRecord(mainPlot, record, dreamCategoryIcon, dreamCategoryIconDescription, dreamMoodIcon, dreamMoodIconDescription, monthName, weekDay, nickname) {
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
                <div class="dream-record__main-middle-tags">
                    <button class="dream-record__main-middle-tags-button">Tag1</button>
                    <button class="dream-record__main-middle-tags-button">Tag2</button>
                    <button class="dream-record__main-middle-tags-button">Tag3</button>
                </div>
                <p class="dream-record__main-middle-plot">${record.dreamPlot}{</p>
            </div>
            <div class="dream-record__main-bottom">
                <button class="dream-record__main-bottom-user">${nickname}</button>
                <a href="#" class="dream-record__main-bottom-look-link">Look</a>
            </div>
        </div>
    </div>`
    }
}