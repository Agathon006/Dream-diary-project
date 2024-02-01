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
    this._initDreamRecords();
  }
  _initDreamRecords() {
    const mainPlot = this.view.getMainPlotElement();
    this.model.getPromiseGetDreamRecords().then(response => {
      if (!response.ok) {
        console.log('Error...');
      }
      return response.json();
    }).then(records => {
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
                </div>`;
      });
    }).catch(error => {
      console.error('Error during getting records', error);
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
  getPromiseGetDreamRecords() {
    return fetch('http://localhost:3000/records');
  }
  replaceWithDefaultIfNotExist(imageUrl) {
    const axios = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'axios'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    axios.head(imageUrl).then(response => {
      return imageUrl;
    }).catch(error => {
      return '../img/default-dream-image.svg';
    });
  }
  whichDreamCategoryIcon(categoryName) {
    switch (categoryName) {
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
      case 7:
        return 'Sunday';
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
      MAIN_PLOT: 'main-plot'
    }
  };

  // static JS_CLASSES = {
  //     COMMON: {
  //         HIDDEN: 'hidden',
  //     },
  // }

  getMainPlotElement() {
    return document.querySelector(`#${View.ID.MAIN.MAIN_PLOT}`);
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