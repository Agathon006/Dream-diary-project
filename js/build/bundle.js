/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/home/controller.js":
/*!*************************************!*\
  !*** ./js/pages/home/controller.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
class Controller {
  constructor(view) {
    this.view = view;
  }
  init() {
    this._initChangeThemeCheckboxListener();
    this._initReasonsSectionsButtonListener();
    this._initDoNotHaveDreamSectionsButtonListener();
  }
  _initChangeThemeCheckboxListener() {
    const themesSwitcherCheckbox = this.view.getThemeCheckboxElement(),
      header = this.view.getHeaderElement(),
      main = this.view.getMainElement(),
      footer = this.view.getFooterElement(),
      themeImage = this.view.getHeaderThemeImageElement(),
      telegramImage = this.view.getFooterTelegramImageElement(),
      linkedinImage = this.view.getFooterLinkedinImageElement(),
      githubImage = this.view.getFooterGithubImageElement();
    if (themesSwitcherCheckbox.checked) {
      header.classList.toggle('primary-style');
      main.classList.toggle('secondary-style');
      footer.classList.toggle('primary-style');
      themeImage.src = './icons/header/theme-dark.svg';
      telegramImage.src = './icons/footer/telegram-dark.svg';
      linkedinImage.src = './icons/footer/linkedin-dark.svg';
      githubImage.src = './icons/footer/github-dark.svg';
    } else {
      header.classList.toggle('primary-style-light');
      main.classList.toggle('secondary-style-light');
      footer.classList.toggle('primary-style-light');
      themeImage.src = './icons/header/theme-light.svg';
      telegramImage.src = './icons/footer/telegram-light.svg';
      linkedinImage.src = './icons/footer/linkedin-light.svg';
      githubImage.src = './icons/footer/github-light.svg';
    }
    themesSwitcherCheckbox.addEventListener('change', function () {
      header.classList.toggle('primary-style');
      main.classList.toggle('secondary-style');
      footer.classList.toggle('primary-style');
      header.classList.toggle('primary-style-light');
      main.classList.toggle('secondary-style-light');
      footer.classList.toggle('primary-style-light');
      if (themesSwitcherCheckbox.checked) {
        themeImage.src = './icons/header/theme-dark.svg';
        telegramImage.src = './icons/footer/telegram-dark.svg';
        linkedinImage.src = './icons/footer/linkedin-dark.svg';
        githubImage.src = './icons/footer/github-dark.svg';
      } else {
        themeImage.src = './icons/header/theme-light.svg';
        telegramImage.src = './icons/footer/telegram-light.svg';
        linkedinImage.src = './icons/footer/linkedin-light.svg';
        githubImage.src = './icons/footer/github-light.svg';
      }
    });
  }
  _initReasonsSectionsButtonListener() {
    const button = this.view.getReasonsSectionsButtonElement(),
      doNotHaveDreamsBlockElement = this.view.getDoNotHaveDreamsBlockElement();
    button.addEventListener('click', () => {
      window.scrollTo({
        top: doNotHaveDreamsBlockElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    });
  }
  _initDoNotHaveDreamSectionsButtonListener() {
    const button = this.view.getDoNotHaveDreamSectionsButtonElement();
    button.addEventListener('click', () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
}

/***/ }),

/***/ "./js/pages/home/view.js":
/*!*******************************!*\
  !*** ./js/pages/home/view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    THEME: {
      CHECKBOX: 'theme-checkbox'
    },
    REASONS_SECTIONS: {
      BUTTON: 'reasons-sections-button'
    },
    DO_NOT_HAVE_DREAM_SECTIONS: {
      BUTTON: 'do-not-have-dreams-sections-button'
    },
    HEADER: {
      THEME_IMAGE: 'theme-image'
    },
    FOOTER: {
      TELEGRAM_IMAGE: 'telegram-image',
      LINKEDIN_IMAGE: 'linkedin-image',
      GITHUB_IMAGE: 'github-image'
    }
  };
  static CLASSES = {
    DO_NOT_HAVE_DREAMS_BLOCK: 'do-not-have-dreams-block',
    BODY: {
      HEADER: 'header',
      MAIN: 'main',
      FOOTER: 'footer'
    }
  };
  getHeaderThemeImageElement() {
    return document.querySelector(`#${View.ID.HEADER.THEME_IMAGE}`);
  }
  getFooterTelegramImageElement() {
    return document.querySelector(`#${View.ID.FOOTER.TELEGRAM_IMAGE}`);
  }
  getFooterLinkedinImageElement() {
    return document.querySelector(`#${View.ID.FOOTER.LINKEDIN_IMAGE}`);
  }
  getFooterGithubImageElement() {
    return document.querySelector(`#${View.ID.FOOTER.GITHUB_IMAGE}`);
  }
  getHeaderElement() {
    return document.querySelector(`.${View.CLASSES.BODY.HEADER}`);
  }
  getMainElement() {
    return document.querySelector(`.${View.CLASSES.BODY.MAIN}`);
  }
  getFooterElement() {
    return document.querySelector(`.${View.CLASSES.BODY.FOOTER}`);
  }
  getThemeCheckboxElement() {
    return document.querySelector(`#${View.ID.THEME.CHECKBOX}`);
  }
  getReasonsSectionsButtonElement() {
    return document.querySelector(`#${View.ID.REASONS_SECTIONS.BUTTON}`);
  }
  getDoNotHaveDreamsBlockElement() {
    return document.querySelector(`.${View.CLASSES.DO_NOT_HAVE_DREAMS_BLOCK}`);
  }
  getDoNotHaveDreamSectionsButtonElement() {
    return document.querySelector(`#${View.ID.DO_NOT_HAVE_DREAM_SECTIONS.BUTTON}`);
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
  !*** ./js/pages/home/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ "./js/pages/home/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller.js */ "./js/pages/home/controller.js");




window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_1__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map