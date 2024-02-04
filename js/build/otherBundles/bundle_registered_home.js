/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/registered_home/controller.js":
/*!************************************************!*\
  !*** ./js/pages/registered_home/controller.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  init() {
    this._initDreamSearchListener();
    this._initDreamCategoryListener();
    this._initDreamMoodListener();
    this._initMainPlotListener();
    this._initDreamRecords();
  }
  _initDreamSearchListener() {
    const dreamSearchInput = this.view.getDreamSearchInputElement(),
      dreamSearchButton = this.view.getDreamSearchButtonElement();
    dreamSearchButton.addEventListener('click', () => {
      this.view.clearMainPlotHtml();
      const categorySelect = this.view.getDreamCategorySelectElement(),
        moodSelect = this.view.getDreamMoodSelectElement();
      this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[moodSelect.selectedIndex].value, moodSelect.options[moodSelect.selectedIndex].value);
    });
  }
  _initDreamCategoryListener() {
    const dreamCategorySelect = this.view.getDreamCategorySelectElement(),
      dreamCategoryIcon = this.view.getDreamCategoryIconElement();
    dreamCategorySelect.addEventListener('change', event => {
      switch (event.target.value) {
        case 'All categories':
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
        moodSelect = this.view.getDreamMoodSelectElement();
      this._initDreamRecords(1, dreamSearchInput.value, event.target.value, moodSelect.options[moodSelect.selectedIndex].value);
    });
  }
  _initDreamMoodListener() {
    const dreamMoodSelect = this.view.getDreamMoodSelectElement(),
      dreamMoodIcon = this.view.getDreamMoodIconElement();
    dreamMoodSelect.addEventListener("change", event => {
      switch (event.target.value) {
        case 'All moods':
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
        categorySelect = this.view.getDreamCategorySelectElement();
      this._initDreamRecords(1, dreamSearchInput.value, categorySelect.options[categorySelect.selectedIndex].value, event.target.value);
    });
  }
  _initMainPlotListener() {
    const mainPlot = this.view.getMainPlotElement();
    mainPlot.addEventListener('click', event => {
      const currentPage = this.view.getCurrentPageNumberElement();
      if (event.target.id === 'pagination-switcher-button-next') {
        this.view.clearMainPlotHtml();
        this._initDreamRecords(+currentPage.innerText + 1);
      }
      ;
      if (event.target.id === 'pagination-switcher-button-prev') {
        this.view.clearMainPlotHtml();
        this._initDreamRecords(+currentPage.innerText - 1);
      }
      ;
    });
  }
  _initDreamRecords(currentPageNumber = 1, searchInput = '', dreamCategory = 'All categories', dreamMood = 'All moods') {
    const mainPlot = this.view.getMainPlotElement();
    this.model.getPromiseGetDreamRecords(currentPageNumber, searchInput, dreamCategory, dreamMood).then(response => {
      if (!response.ok) {
        console.log('Error...');
      }
      return response.json();
    }).then(records => {
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
          }
          ;
          if (currentPageNumber === records.pages) {
            const nextButton = this.view.getNextButton();
            this.view.addClassHidden(nextButton);
          }
        }
        records.data.forEach((record, index) => {
          this._putDreamRecord(mainPlot, record);
        });
      }
    }).catch(error => {
      console.error('Error during getting records', error);
    });
  }
  _putDreamRecord(mainPlot, record) {
    this.model.getPromiseGetUserByEmail(record.email).then(response => response.json()).then(data => {
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
    }).catch(error => {
      console.error('Error:', error);
    });
  }
}

/***/ }),

/***/ "./js/pages/registered_home/model.js":
/*!*******************************************!*\
  !*** ./js/pages/registered_home/model.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
class Model {
  getPromiseGetDreamRecords(page, searchInput, category, mood) {
    if (searchInput != '' && category !== 'All categories' && mood !== 'All moods') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&dreamMood=${mood}`);
    }
    if (searchInput != '' && category !== 'All categories') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}`);
    }
    if (searchInput != '' && mood !== 'All moods') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamMood=${mood}`);
    }
    if (category !== 'All categories' && mood !== 'All moods') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&dreamMood=${mood}`);
    }
    if (searchInput != '') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}`);
    }
    if (category !== 'All categories') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}`);
    }
    if (mood !== 'All moods') {
      return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamMood=${mood}`);
    }
    return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5`);
  }
  getPromiseGetUserByEmail(email) {
    return fetch(`http://localhost:3000/users?email=${email}`);
  }
  whichDreamCategoryIcon(categoryName) {
    switch (categoryName) {
      case 'Category':
        return '../icons/make_record/dream_category/select.svg';
      case 'Usual':
        return '../icons/make_record/dream_category/usual.svg';
      case 'Just talking':
        return '../icons/make_record/dream_category/just_talking.svg';
      case 'Nightmare':
        return '../icons/make_record/dream_category/nightmare.svg';
      case 'Action':
        return '../icons/make_record/dream_category/action.svg';
      case 'Trash':
        return '../icons/make_record/dream_category/trash.svg';
      case 'Conscious dream':
        return '../icons/make_record/dream_category/conscious_dream.svg';
      default:
        console.log('No such option in select dream category');
    }
  }
  whichDreamCategoryIconDescription(categoryName) {
    switch (categoryName) {
      case 'Usual':
        return 'Usual';
      case 'Just talking':
        return 'Just talking';
      case 'Nightmare':
        return 'Nightmare';
      case 'Action':
        return 'Action';
      case 'Trash':
        return 'Trash';
      case 'Conscious dream':
        return 'Conscious dream';
      default:
        console.log('No such option in select dream category');
    }
  }
  whichDreamMoodIcon(moodName) {
    switch (moodName) {
      case 'Typical dream':
        return '../icons/make_record/dream_mood/typical_dream.svg';
      case 'Fun dream':
        return '../icons/make_record/dream_mood/fun_dream.svg';
      case 'Sad dream':
        return '../icons/make_record/dream_mood/sad_dream.svg';
      case 'Terrible':
        return '../icons/make_record/dream_mood/terrible.svg';
      case 'Made me think':
        return '../icons/make_record/dream_mood/made_me_think.svg';
      default:
        console.log('No such option in select dream category');
    }
  }
  whichDreamMoodIconDescription(moodName) {
    switch (moodName) {
      case 'Typical dream':
        return 'Typical dream';
      case 'Fun dream':
        return 'Fun dream';
      case 'Sad dream':
        return 'Sad dream';
      case 'Terrible':
        return 'Terrible dream';
      case 'Made me think':
        return 'Made me think';
      default:
        console.log('No such option in select dream category');
    }
  }
  whichMonthNameByNumber(monthNumber) {
    switch (monthNumber) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        console.log('No such month');
    }
  }
  whichWeekDayNameByNumber(weekNumber) {
    switch (weekNumber) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        console.log('No such week day');
    }
  }
}

/***/ }),

/***/ "./js/pages/registered_home/view.js":
/*!******************************************!*\
  !*** ./js/pages/registered_home/view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    MAIN: {
      PREV_BUTTON: 'pagination-switcher-button-prev',
      NEXT_BUTTON: 'pagination-switcher-button-next',
      CURRENT_PAGE_NUMBER: 'current-page-number',
      MAIN_PLOT: 'main-plot'
    },
    FILTER: {
      DREAM_SEARCH_INPUT: 'dream-search-input',
      DREAM_SEARCH_BUTTON: 'dream-search-button',
      DREAM_CATEGORY_SELECT: 'dream-category-select',
      DREAM_CATEGORY_ICON: 'dream-category-icon',
      DREAM_MOOD_SELECT: 'dream-mood-select',
      DREAM_MOOD_ICON: 'dream-mood-icon'
    }
  };
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
    mainPlot.innerHTML += `<div class="empty-message">
                <span class="empty-message__span">There are no such records. Try to change the filters or the search query.</span>
                <button class="empty-message__button">CLEAR SEARCH</button>
            </div>`;
  }
  displaySimplePagination(mainPlot, dreamsNumber) {
    mainPlot.innerHTML += `<div class="pagination-switcher">
            <button class="pagination-switcher__button hidden"><</button>
                <div class="pagination-switcher__plot">
                    <div class="pagination-switcher__plot-top">
                        <span class="pagination-switcher__plot-text">Found: </span>
                        <span class="pagination-switcher__plot-key">${dreamsNumber}</span>
                        <span class="pagination-switcher__plot-text"> dreams</span>
                    </div>
                </div>
                <button class="pagination-switcher__button hidden"><</button>
            </div>`;
  }
  displayPagination(mainPlot, dreamsNumber, currentPageNumber, pagesNumber) {
    mainPlot.innerHTML += `<div class="pagination-switcher">
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
            </div>`;
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
    </div>`;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./js/pages/registered_home/index.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./js/pages/registered_home/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./js/pages/registered_home/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ "./js/pages/registered_home/controller.js");





window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_1__["default"](), new _model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_registered_home.js.map