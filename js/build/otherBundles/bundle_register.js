/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/register/controller.js":
/*!*****************************************!*\
  !*** ./js/pages/register/controller.js ***!
  \*****************************************/
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
    this._initFormListener();
  }
  _initFormListener() {
    const form = this.view.getRegistrerFormElement(),
      SubmitButton = this.view.getSubmitInputElement();
    form.addEventListener('submit', e => {
      e.preventDefault();
      this.view.clearClassWrongInputFromElements();
      this.view.clearClassWrongSpanFromElements();
      const formData = new FormData(form);
      const formInfo = Object.fromEntries(formData);
      if (!this._isFormValidationOkay()) {
        return;
      }
      const isNicknameInDb = this._getPromiseIsNicknameExist();
      const isEmailInDb = this._getPromiseIsEmailExist();
      Promise.all([isNicknameInDb, isEmailInDb]).then(data => {
        if (!(data[0] || data[1])) {
          const data = JSON.stringify(formInfo);
          this.model.registerNewUser(data).then(response => {
            if (!response.ok) {
              this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
            }
            return true;
          }).then(response => {
            // переводим пользователя в home?
          }).catch(error => {
            this.view.createWrongSpanElement(SubmitButton, `Something go wrong... ${error}`);
          });
        }
      }).catch(error => {
        this.view.createWrongSpanElement(SubmitButton, `Something go wrong... ${error}`);
      });
    });
  }
  _isFormValidationOkay() {
    const form = this.view.getRegistrerFormElement(),
      nicknameInput = this.view.getNicknameInputElement(),
      emailInput = this.view.getEmailInputElement(),
      passwordInput = this.view.getPasswordInputElement();
    const formData = new FormData(form);
    const formInfo = Object.fromEntries(formData);
    let isValidationOkay = true;
    if (!this.model.isNicknameOkay(formInfo.nickname)) {
      this.view.addClassWrongInput(nicknameInput);
      this.view.createWrongSpanElement(nicknameInput, "Nickname must consist of 5-15 numbers/letters and can't start with a number");
      isValidationOkay = false;
    }
    if (!this.model.isEmailOkay(formInfo.email)) {
      this.view.addClassWrongInput(emailInput);
      this.view.createWrongSpanElement(emailInput, "Incorrect email");
      isValidationOkay = false;
    }
    if (!this.model.isPasswordOkay(formInfo.password)) {
      this.view.addClassWrongInput(passwordInput);
      this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
      isValidationOkay = false;
    }
    return isValidationOkay;
  }
  _getPromiseIsNicknameExist() {
    const form = this.view.getRegistrerFormElement(),
      nicknameInput = this.view.getNicknameInputElement();
    const formData = new FormData(form);
    const formInfo = Object.fromEntries(formData);
    return this.model.isNicknameInDb(formInfo.nickname).then(response => {
      if (!response.ok) {
        this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
      }
      return response.json();
    }).then(data => {
      if (data.length) {
        this.view.addClassWrongInput(nicknameInput);
        this.view.createWrongSpanElement(nicknameInput, "That nickname is already used");
        return true;
      }
      return false;
    });
  }
  _getPromiseIsEmailExist() {
    const form = this.view.getRegistrerFormElement(),
      emailInput = this.view.getEmailInputElement();
    const formData = new FormData(form);
    const formInfo = Object.fromEntries(formData);
    return this.model.isEmailInDb(formInfo.email).then(response => {
      if (!response.ok) {
        this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
      }
      return response.json();
    }).then(data => {
      if (data.length) {
        this.view.addClassWrongInput(emailInput);
        this.view.createWrongSpanElement(emailInput, "That email is already used");
        return true;
      }
      return false;
    });
  }
}

/***/ }),

/***/ "./js/pages/register/model.js":
/*!************************************!*\
  !*** ./js/pages/register/model.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
class Model {
  isNicknameOkay(nicknameInput) {
    return nicknameInput.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/);
  }
  isEmailOkay(emailInput) {
    return emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  isPasswordOkay(passwordInput) {
    return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
  }
  isNicknameInDb(nickname) {
    return fetch(`http://localhost:3000/users?nickname=${nickname}`);
  }
  isEmailInDb(email) {
    return fetch(`http://localhost:3000/users?email=${email}`);
  }
  registerNewUser(data) {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
  }
}

/***/ }),

/***/ "./js/pages/register/view.js":
/*!***********************************!*\
  !*** ./js/pages/register/view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    REGISTER_FORM: {
      FORM: 'register-form',
      NICKNAME_INPUT: 'nickname-input',
      EMAIL_INPUT: 'email-input',
      PASSWORD_INPUT: 'password-input',
      SUBMIT_INPUT: 'register-form-submit'
    }
  };
  static JS_CLASSES = {
    REGISTER_FORM: {
      WRONG_INPUT: 'wrong-input',
      WRONG_SPAN: 'wrong-span'
    }
  };
  getRegistrerFormElement() {
    return document.querySelector(`#${View.ID.REGISTER_FORM.FORM}`);
  }
  getNicknameInputElement() {
    return document.querySelector(`#${View.ID.REGISTER_FORM.NICKNAME_INPUT}`);
  }
  getEmailInputElement() {
    return document.querySelector(`#${View.ID.REGISTER_FORM.EMAIL_INPUT}`);
  }
  getPasswordInputElement() {
    return document.querySelector(`#${View.ID.REGISTER_FORM.PASSWORD_INPUT}`);
  }
  getSubmitInputElement() {
    return document.querySelector(`#${View.ID.REGISTER_FORM.SUBMIT_INPUT}`);
  }
  addClassWrongInput(element) {
    element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
  }
  createWrongSpanElement(element, message) {
    let warningSpan = document.createElement('span');
    warningSpan.innerText = message;
    warningSpan.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN);
    element.parentNode.insertBefore(warningSpan, element.nextSibling);
  }
  clearClassWrongInputFromElements() {
    document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT}`).forEach(item => {
      item.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    });
  }
  clearClassWrongSpanFromElements() {
    document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN}`).forEach(item => {
      item.remove();
    });
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
/*!************************************!*\
  !*** ./js/pages/register/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./js/pages/register/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./js/pages/register/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ "./js/pages/register/controller.js");





window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_1__["default"](), new _model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_register.js.map