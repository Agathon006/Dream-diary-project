/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/moon/controller.js":
/*!*************************************!*\
  !*** ./js/pages/moon/controller.js ***!
  \*************************************/
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
    this._initMyPlaceButton();
    this._initGetCurrentForecast();
  }
  _initMyPlaceButton() {
    const myPlaceButton = this.view.getMyPlaceButtonElement();
    myPlaceButton.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(position => {
        this.model.getWeatherForecastForCurrentLocation(position.coords.latitude, position.coords.longitude).then(response => response.json()).then(data => {
          this.view.toggleClassHidden(myPlaceButton);
          const forecastContainer = this.view.getForecastContainerElement(),
            forecastPlace = this.view.getForecastPlaceElement();
          forecastPlace.innerText = `Place: ${data.city.name}`;
          let firstNewDayWeatherIndex = 0;
          for (let threeHoursForecast of data.list) {
            if (threeHoursForecast.dt_txt.includes('00:00:00')) {
              break;
            }
            firstNewDayWeatherIndex++;
          }
          for (let i = 0; i < 5; i++) {
            let j = i * 8 + firstNewDayWeatherIndex;
            forecastContainer.children[i].children[0].innerText = data.list[j].dt_txt;
            forecastContainer.children[i].children[1].src = `./../icons/moon/${data.list[j].weather[0].icon}.png`;
            forecastContainer.children[i].children[2].innerText = data.list[j].weather[0].main;
            forecastContainer.children[i].children[3].children[1].innerText = `${data.list[j].clouds.all}%`;
            this.view.whichColorForCloudCover(forecastContainer.children[i].children[3].children[1], data.list[j].clouds.all, forecastContainer.children[i].children[4]);
          }
          ;
        }).catch(error => {
          console.log('Error getting data from weather API: ', error);
        });
      });
    });
  }
  _initGetCurrentForecast() {
    this.model.getWeatherForecastMinsk().then(response => response.json()).then(data => {
      const forecastContainer = this.view.getForecastContainerElement(),
        forecastPlace = this.view.getForecastPlaceElement();
      forecastPlace.innerText = `Place: ${data.city.name}`;
      let firstNewDayWeatherIndex = 0;
      for (let threeHoursForecast of data.list) {
        if (threeHoursForecast.dt_txt.includes('00:00:00')) {
          break;
        }
        firstNewDayWeatherIndex++;
      }
      for (let i = 0; i < 5; i++) {
        let j = i * 8 + firstNewDayWeatherIndex;
        forecastContainer.children[i].children[0].innerText = data.list[j].dt_txt;
        forecastContainer.children[i].children[1].src = `./../icons/moon/${data.list[j].weather[0].icon}.png`;
        forecastContainer.children[i].children[2].innerText = data.list[j].weather[0].main;
        forecastContainer.children[i].children[3].children[1].innerText = `${data.list[j].clouds.all}%`;
        this.view.whichColorForCloudCover(forecastContainer.children[i].children[3].children[1], data.list[j].clouds.all, forecastContainer.children[i].children[4]);
      }
      ;
    }).catch(error => {
      console.log('Error getting data from weather API: ', error);
    });
  }
}

/***/ }),

/***/ "./js/pages/moon/model.js":
/*!********************************!*\
  !*** ./js/pages/moon/model.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
class Model {
  getWeatherForecastMinsk() {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);
  }
  getWeatherForecastForCurrentLocation(latitude, longitude) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);
  }
}

/***/ }),

/***/ "./js/pages/moon/view.js":
/*!*******************************!*\
  !*** ./js/pages/moon/view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    FORECAST: {
      PLACE: 'forecast-place',
      MY_PLACE_BUTTON: 'forecast-place-button',
      CONTAINER: 'forecast-container'
    }
  };
  static JS_CLASSES = {
    COMMON: {
      HIDDEN: 'hidden'
    }
  };
  getForecastPlaceElement() {
    return document.querySelector(`#${View.ID.FORECAST.PLACE}`);
  }
  getMyPlaceButtonElement() {
    return document.querySelector(`#${View.ID.FORECAST.MY_PLACE_BUTTON}`);
  }
  getForecastContainerElement() {
    return document.querySelector(`#${View.ID.FORECAST.CONTAINER}`);
  }
  whichColorForCloudCover(element, number, resultElement) {
    if (number > 67) {
      element.style.color = 'red';
      resultElement.style.color = 'red';
      resultElement.innerText = 'Unlikely';
    } else if (number > 33) {
      element.style.color = 'yellow';
      resultElement.style.color = 'yellow';
      resultElement.innerText = 'Perhaps';
    } else {
      element.style.color = 'green';
      resultElement.style.color = 'green';
      resultElement.innerText = 'Most likely';
    }
  }
  toggleClassHidden(element) {
    element.classList.toggle(View.JS_CLASSES.COMMON.HIDDEN);
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
  !*** ./js/pages/moon/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./js/pages/moon/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./js/pages/moon/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ "./js/pages/moon/controller.js");





window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_1__["default"](), new _model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_moon.js.map