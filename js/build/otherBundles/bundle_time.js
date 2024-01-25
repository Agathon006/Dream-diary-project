/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/time/controller.js":
/*!*************************************!*\
  !*** ./js/pages/time/controller.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
class Controller {
  constructor(view) {
    this.view = view;
    this._updateClocks = this._updateClocks.bind(this);
  }
  init() {
    this._updateClocks();
    setInterval(this._updateClocks, 1000);
  }
  _updateClocks() {
    const subtitle = this.view.getSubtitle('CURRENT'),
      subtitleNewYork = this.view.getSubtitle('NEW_YORK'),
      subtitleLondon = this.view.getSubtitle('LONDON'),
      subtitleTokyo = this.view.getSubtitle('TOKYO'),
      subtitleBerlin = this.view.getSubtitle('BERLIN'),
      subtitleChina = this.view.getSubtitle('CHINA'),
      subtitleSydney = this.view.getSubtitle('SYDNEY'),
      subtitleCalifornia = this.view.getSubtitle('CALIFORNIA'),
      subtitleIndia = this.view.getSubtitle('INDIA');
    const currentDate = new Date();
    const hours = currentDate.getHours(),
      minutes = currentDate.getMinutes(),
      seconds = currentDate.getSeconds();
    this.view.transformCurrentClock(hours, minutes, seconds);
    this.view.transformNewYorkClock(hours, minutes, seconds);
    this.view.transformLondonClock(hours, minutes, seconds);
    this.view.transformTokyoClock(hours, minutes, seconds);
    this.view.transformBerlinClock(hours, minutes, seconds);
    this.view.transformChinaClock(hours, minutes, seconds);
    this.view.transformSydneyClock(hours, minutes, seconds);
    this.view.transformCaliforniaClock(hours, minutes, seconds);
    this.view.transformIndiaClock(hours, minutes, seconds);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    subtitle.textContent = formattedDate;
    currentDate.setHours(currentDate.getHours() - 8);
    const formattedDateNewYork = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-5");
    subtitleNewYork.textContent = formattedDateNewYork;
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDateLondon = currentDate.toLocaleString('en-US', options).slice(0, -2).concat(" -");
    subtitleLondon.textContent = formattedDateLondon;
    currentDate.setHours(currentDate.getHours() + 9);
    const formattedDateTokyo = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+9");
    subtitleTokyo.textContent = formattedDateTokyo;
    currentDate.setHours(currentDate.getHours() - 8);
    const formattedDateBerlin = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+1");
    subtitleBerlin.textContent = formattedDateBerlin;
    currentDate.setHours(currentDate.getHours() + 7);
    const formattedDateChina = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+8");
    subtitleChina.textContent = formattedDateChina;
    currentDate.setHours(currentDate.getHours() + 3);
    const formattedDateSydney = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+11");
    subtitleSydney.textContent = formattedDateSydney;
    currentDate.setHours(currentDate.getHours() + 5);
    const formattedDateCalifornia = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-8");
    subtitleCalifornia.textContent = formattedDateCalifornia;
    currentDate.setHours(currentDate.getHours() - 11);
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    const formattedDateIndia = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+5:30");
    subtitleIndia.textContent = formattedDateIndia;
  }
}

/***/ }),

/***/ "./js/pages/time/view.js":
/*!*******************************!*\
  !*** ./js/pages/time/view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    HOUR_CONTAINERS: {
      CURRENT: 'hour-container-current',
      NEW_YORK: 'hour-container-new-york',
      LONDON: 'hour-container-london',
      TOKYO: 'hour-container-tokyo',
      BERLIN: 'hour-container-berlin',
      CHINA: 'hour-container-china',
      SYDNEY: 'hour-container-sydney',
      CALIFORNIA: 'hour-container-california',
      INDIA: 'hour-container-india'
    },
    MINUTE_CONTAINERS: {
      CURRENT: 'minute-container-current',
      NEW_YORK: 'minute-container-new-york',
      LONDON: 'minute-container-london',
      TOKYO: 'minute-container-tokyo',
      BERLIN: 'minute-container-berlin',
      CHINA: 'minute-container-china',
      SYDNEY: 'minute-container-sydney',
      CALIFORNIA: 'minute-container-california',
      INDIA: 'minute-container-india'
    },
    SECOND_CONTAINERS: {
      CURRENT: 'second-container-current',
      NEW_YORK: 'second-container-new-york',
      LONDON: 'second-container-london',
      TOKYO: 'second-container-tokyo',
      BERLIN: 'second-container-berlin',
      CHINA: 'second-container-china',
      SYDNEY: 'second-container-sydney',
      CALIFORNIA: 'second-container-california',
      INDIA: 'second-container-india'
    },
    SUBTITLES: {
      CURRENT: 'subtitle-current',
      NEW_YORK: 'subtitle-new-york',
      LONDON: 'subtitle-london',
      TOKYO: 'subtitle-tokyo',
      BERLIN: 'subtitle-berlin',
      CHINA: 'subtitle-china',
      SYDNEY: 'subtitle-sydney',
      CALIFORNIA: 'subtitle-california',
      INDIA: 'subtitle-india'
    }
  };
  getHourContainer(name) {
    return document.querySelector(`#${View.ID.HOUR_CONTAINERS[name]}`);
  }
  getMinuteContainer(name) {
    return document.querySelector(`#${View.ID.MINUTE_CONTAINERS[name]}`);
  }
  getSecondContainer(name) {
    return document.querySelector(`#${View.ID.SECOND_CONTAINERS[name]}`);
  }
  getSubtitle(name) {
    return document.querySelector(`#${View.ID.SUBTITLES[name]}`);
  }
  transformCurrentClock(hours, minutes, seconds) {
    this.getSecondContainer('CURRENT').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('CURRENT').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('CURRENT').style.transform = `rotate(${30 * hours + 0.5 * minutes}deg)`;
  }
  transformNewYorkClock(hours, minutes, seconds) {
    this.getSecondContainer('NEW_YORK').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('NEW_YORK').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('NEW_YORK').style.transform = `rotate(${30 * hours + 0.5 * minutes - 240}deg)`;
  }
  transformLondonClock(hours, minutes, seconds) {
    this.getSecondContainer('LONDON').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('LONDON').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('LONDON').style.transform = `rotate(${30 * hours + 0.5 * minutes - 90}deg)`;
  }
  transformTokyoClock(hours, minutes, seconds) {
    this.getSecondContainer('TOKYO').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('TOKYO').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('TOKYO').style.transform = `rotate(${30 * hours + 0.5 * minutes - 180}deg)`;
  }
  transformBerlinClock(hours, minutes, seconds) {
    this.getSecondContainer('BERLIN').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('BERLIN').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('BERLIN').style.transform = `rotate(${30 * hours + 0.5 * minutes - 60}deg)`;
  }
  transformChinaClock(hours, minutes, seconds) {
    this.getSecondContainer('CHINA').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('CHINA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('CHINA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 210}deg)`;
  }
  transformSydneyClock(hours, minutes, seconds) {
    this.getSecondContainer('SYDNEY').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('SYDNEY').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('SYDNEY').style.transform = `rotate(${30 * hours + 0.5 * minutes - 120}deg)`;
  }
  transformCaliforniaClock(hours, minutes, seconds) {
    this.getSecondContainer('CALIFORNIA').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('CALIFORNIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
    this.getHourContainer('CALIFORNIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 330}deg)`;
  }
  transformIndiaClock(hours, minutes, seconds) {
    this.getSecondContainer('INDIA').style.transform = `rotate(${6 * seconds}deg)`;
    this.getMinuteContainer('INDIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds + 180}deg)`;
    this.getHourContainer('INDIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 285}deg)`;
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
/*!********************************!*\
  !*** ./js/pages/time/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ "./js/pages/time/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller.js */ "./js/pages/time/controller.js");




window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_1__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_time.js.map