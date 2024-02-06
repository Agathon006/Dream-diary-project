/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/view_record/controller.js":
/*!********************************************!*\
  !*** ./js/pages/view_record/controller.js ***!
  \********************************************/
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
    this.model.getPromiseGetDreamRecords(recordId).then(response => {
      if (!response.ok) {
        console.log('Error...');
      }
      return response.json();
    }).then(record => {
      const newViewsNumber = record.views + 1;
      this.model.getPromiseChangeRecordViews(recordId, newViewsNumber).then(response => {
        if (!response.ok) {
          throw new Error('Failed to update views on dream');
        }
        return response.json();
      }).then(record => {
        dreamTitle.innerText = record.dreamTitle;
        dreamDate.innerText = `Dreamed ${record.date.dayNumber} ${this.model.whichMonthNameByNumber(record.date.monthNumber)} ${record.date.year}`;
        dreamViews.innerText = `${record.views} views`;
        dreamCategory.src = this.model.whichDreamCategoryIcon(record.dreamCategory);
        dreamCategorySpan.innerText = record.dreamCategory;
        dreamMood.src = this.model.whichDreamMoodIcon(record.dreamMood);
        dreamMoodSpan.innerText = record.dreamMood;
        dreamImage.src = record.dreamImageUrl;
        dreamPlot.innerText = record.dreamPlot;
        this.model.getPromiseGetUserByEmail(record.email).then(response => response.json()).then(data => {
          if (data.length) {
            dreamUserAvatar.src = data[0].avatar;
            dreamUserNickname.innerText = data[0].nickname;
          } else {
            console.log('User not found');
          }
        }).catch(error => {
          console.error('Error:', error);
        });
      }).catch(error => {
        console.error('Error updating views on dream:', error);
      });
    }).catch(error => {
      console.error('Error during getting record', error);
    });
  }
}

/***/ }),

/***/ "./js/pages/view_record/model.js":
/*!***************************************!*\
  !*** ./js/pages/view_record/model.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
class Model {
  getPromiseChangeRecordViews(id, newNumber) {
    return fetch(`http://localhost:3000/records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        views: newNumber
      })
    });
  }
  getPromiseGetDreamRecords(id) {
    return fetch(`http://localhost:3000/records/${id}`);
  }
  getPromiseGetUserByEmail(email) {
    return fetch(`http://localhost:3000/users?email=${email}`);
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
}

/***/ }),

/***/ "./js/pages/view_record/view.js":
/*!**************************************!*\
  !*** ./js/pages/view_record/view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    DREAM_RECORD: {
      TITLE: 'dream-title',
      DATE: 'dream-date',
      VIEWS: 'dream-views',
      CATEGORY: 'dream-category',
      CATEGORY_SPAN: 'dream-category-span',
      MOOD: 'dream-mood',
      MOOD_SPAN: 'dream-mood-span',
      USER_AVATAR: 'dream-user-avatar',
      USER_NICKNAME: 'dream-user-nickname',
      IMAGE: 'dream-image',
      PLOT: 'dream-plot'
    }
  };
  getDreamTitleElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.TITLE}`);
  }
  getDreamDateElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.DATE}`);
  }
  getDreamViewsElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.VIEWS}`);
  }
  getDreamCategoryElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.CATEGORY}`);
  }
  getDreamCategorySpanElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.CATEGORY_SPAN}`);
  }
  getDreamMoodElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.MOOD}`);
  }
  getDreamMoodSpanElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.MOOD_SPAN}`);
  }
  getDreamUserAvatarElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.USER_AVATAR}`);
  }
  getDreamUserNicknameElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.USER_NICKNAME}`);
  }
  getDreamImageElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.IMAGE}`);
  }
  getDreamPlotElement() {
    return document.querySelector(`#${View.ID.DREAM_RECORD.PLOT}`);
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
/*!***************************************!*\
  !*** ./js/pages/view_record/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./js/pages/view_record/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./js/pages/view_record/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ "./js/pages/view_record/controller.js");





window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_1__["default"](), new _model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_view_record.js.map