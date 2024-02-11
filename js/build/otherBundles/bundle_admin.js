/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/admin/controller.js":
/*!**************************************!*\
  !*** ./js/pages/admin/controller.js ***!
  \**************************************/
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
    this._initAdminPage();
    this._initModalListener();
    this._initSectionListener();
    this._initUsersButtonListener();
    this._initRecordsButtonListener();
  }
  _initAdminPage() {
    const usersOption = this.view.getUsersButtonElement();
    this.view.toggleClassSelected(usersOption);
    this.model.getPromiseGetAllUsers().then(response => response.json()).then(data => {
      this.view.displayUsersTable(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  _initModalListener() {
    const modalWrapper = this.view.getModalWrapperElement(),
      section = this.view.getSectionElement();
    modalWrapper.addEventListener('click', event => {
      if (event.target.id === 'option-yes') {
        if (section.children[1].classList.contains('profile-avatar')) {
          this.model.getPromiseDeleteUserById(section.children[4].value).then(response => response.json()).then(data => {
            this.view.toggleClassHidden(modalWrapper);
            this.model.getPromiseGetAllUsers().then(response => response.json()).then(data => {
              this.view.displayUsersTable(data);
            }).catch(error => {
              console.error('Error:', error);
            });
          }).catch(error => {
            console.error('Error:', error);
          });
        } else if (section.children[1].classList.contains('record-image')) {
          this.model.getPromiseDeleteRecordById(section.children[4].value).then(response => response.json()).then(data => {
            this.view.toggleClassHidden(modalWrapper);
            this.model.getPromiseGetAllRecords().then(response => response.json()).then(data => {
              this.view.displayRecordsTable(data);
            }).catch(error => {
              console.error('Error:', error);
            });
          }).catch(error => {
            console.error('Error:', error);
          });
        }
      }
      if (event.target.id === 'option-no') {
        this.view.toggleClassHidden(modalWrapper);
      }
      if (event.target.classList.contains('modal-wrapper')) {
        this.view.toggleClassHidden(modalWrapper);
      }
    });
  }
  _initSectionListener() {
    const section = this.view.getSectionElement();
    let previousInputs = [];
    section.addEventListener('click', event => {
      if (event.target.classList.contains('edit-user-button')) {
        this.model.getPromiseGetUserById(event.target.parentNode.parentNode.children[0].innerText).then(response => response.json()).then(data => {
          this.view.displayUser(section, data);
          $('#datepicker').datepicker();
        }).catch(error => {
          console.error('Error:', error);
        });
      }
      if (event.target.classList.contains('edit-record-button')) {
        this.model.getPromiseGetRecordById(event.target.parentNode.parentNode.children[0].innerText).then(response => response.json()).then(data => {
          this.view.displayRecord(section, data);
        }).catch(error => {
          console.error('Error:', error);
        });
      }
      if (event.target.id === 'return-button') {
        if (section.parentNode.children[0].children[0].classList.contains('selected')) {
          this.model.getPromiseGetAllUsers().then(response => response.json()).then(data => {
            this.view.displayUsersTable(data);
          }).catch(error => {
            console.error('Error:', error);
          });
        } else {
          this.model.getPromiseGetAllRecords().then(response => response.json()).then(data => {
            this.view.displayRecordsTable(data);
          }).catch(error => {
            console.error('Error:', error);
          });
        }
      }
      if (event.target.classList.contains('delete-button')) {
        const modalWrapper = this.view.getModalWrapperElement();
        this.view.toggleClassHidden(modalWrapper);
      }
      if (event.target.classList.contains('edit-button') && event.target.innerText === 'Edit') {
        const sectionInputs = [];
        previousInputs = [];
        for (let child of section.children) {
          if (child.classList.contains('profile-input')) {
            sectionInputs.push(child);
            previousInputs.push(child.value);
          }
        }
        this.view.toggleInputs(sectionInputs);
        event.target.innerText = 'Save';
      } else if (event.target.classList.contains('edit-button') && event.target.innerText === 'Save') {
        const sectionInputs = [];
        for (let child of section.children) {
          if (child.classList.contains('profile-input')) {
            sectionInputs.push(child);
          }
        }
        if (previousInputs.every((value, index) => value === sectionInputs[index].value)) {
          this.view.toggleInputs(sectionInputs);
          event.target.innerText = 'Edit';
        } else {
          if (sectionInputs[0].id === 'avatar-url-input') {
            if (this._isUserValidationOkay(sectionInputs)) {
              this.view.clearClassWrongInputFromElements();
              this.view.clearClassWrongSpanFromElements();
              if (previousInputs[2] !== sectionInputs[2].value) {
                this._isNewNicknameExist(sectionInputs[2], previousInputs, sectionInputs);
              } else {
                this._updateUserData(sectionInputs, previousInputs[1]);
              }
            }
          } else if (sectionInputs[0].id === 'record-url-input') {
            this._isRecordValidationOkay(sectionInputs);
          }
        }
      }
    });
  }
  _isUserValidationOkay(inputs) {
    let isValidationOkay = true;
    this.view.clearClassWrongInputFromElements();
    this.view.clearClassWrongSpanFromElements();
    if (!inputs[1].value.match(/^[a-zA-Z0-9_]{4,10}$/)) {
      this.view.addClassWrongInput(inputs[1]);
      this.view.createWrongSpanElement(inputs[1], "Id must consist of 4-10 numbers/letters");
      isValidationOkay = false;
    }
    if (!inputs[2].value.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/)) {
      this.view.addClassWrongInput(inputs[2]);
      this.view.createWrongSpanElement(inputs[2], "Nickname must consist of 5-15 numbers/letters and can't start with a number");
      isValidationOkay = false;
    }
    if (!inputs[5].value.match(/^[A-Za-z]*$/)) {
      this.view.addClassWrongInput(inputs[5]);
      this.view.createWrongSpanElement(inputs[5], "Name must consist of letters");
      isValidationOkay = false;
    }
    if (!inputs[6].value.match(/^[A-Za-z]*$/)) {
      this.view.addClassWrongInput(inputs[6]);
      this.view.createWrongSpanElement(inputs[6], "Surname must consist of letters");
      isValidationOkay = false;
    }
    if (!inputs[7].value.match(/\/(19[0-9][0-9]|200[0-2]|202[0-3])$/) && inputs[7].value !== '') {
      this.view.addClassWrongInput(inputs[7]);
      this.view.createWrongSpanElement(inputs[7], "Put correct date");
      isValidationOkay = false;
    }
    return isValidationOkay;
  }
  _isNewNicknameExist(nicknameInput, previousInputs, sectionInputs) {
    this.model.getPromiseGetUserByNickname(nicknameInput.value).then(response => response.json()).then(data => {
      if (data[0]) {
        this.view.addClassWrongInput(nicknameInput);
        this.view.createWrongSpanElement(nicknameInput, "This nickname is already exists");
      } else {
        this._updateUserData(sectionInputs, previousInputs[1]);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  _updateUserData(sectionInputs, userId) {
    this.model.getPromiseEditUser(sectionInputs, userId).then(response => response.json()).then(data => {
      this.model.getPromiseGetUserById(data.id).then(response => response.json()).then(data => {
        const section = this.view.getSectionElement();
        this.view.displayUser(section, data);
        $('#datepicker').datepicker();
      }).catch(error => {
        console.error('Error:', error);
      });
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  _initUsersButtonListener() {
    const usersButton = this.view.getUsersButtonElement(),
      recordsButton = this.view.getRecordsButtonElement();
    usersButton.addEventListener('click', () => {
      this.view.toggleClassSelected(usersButton);
      this.view.toggleClassSelected(recordsButton);
      this.model.getPromiseGetAllUsers().then(response => response.json()).then(data => {
        this.view.displayUsersTable(data);
      }).catch(error => {
        console.error('Error:', error);
      });
    });
  }
  _initRecordsButtonListener() {
    const usersButton = this.view.getUsersButtonElement(),
      recordsButton = this.view.getRecordsButtonElement();
    recordsButton.addEventListener('click', () => {
      this.view.toggleClassSelected(usersButton);
      this.view.toggleClassSelected(recordsButton);
      this.model.getPromiseGetAllRecords().then(response => response.json()).then(data => {
        this.view.displayRecordsTable(data);
      }).catch(error => {
        console.error('Error:', error);
      });
    });
  }
}

/***/ }),

/***/ "./js/pages/admin/model.js":
/*!*********************************!*\
  !*** ./js/pages/admin/model.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
class Model {
  getPromiseGetAllUsers(page = 1) {
    return fetch(`http://localhost:3000/users?_page=${page}&_per_page=20`);
  }
  getPromiseGetAllRecords(page = 1) {
    return fetch(`http://localhost:3000/records?_page=${page}&_per_page=20`);
  }
  getPromiseGetUserById(id) {
    return fetch(`http://localhost:3000/users/${id}`);
  }
  getPromiseGetUserByNickname(nickname) {
    return fetch(`http://localhost:3000/users?nickname=${nickname}`);
  }
  getPromiseGetRecordById(id) {
    return fetch(`http://localhost:3000/records/${id}`);
  }
  getPromiseDeleteUserById(id) {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    });
  }
  getPromiseDeleteRecordById(id) {
    return fetch(`http://localhost:3000/records/${id}`, {
      method: 'DELETE'
    });
  }
  getPromiseEditUser(sectionInputs, userId) {
    const editedData = {
      "avatar": sectionInputs[0].value,
      "nickname": sectionInputs[2].value,
      "role": sectionInputs[4].value,
      "name": sectionInputs[5].value,
      "surname": sectionInputs[6].value,
      "birthDate": sectionInputs[7].value,
      "profileInfo": sectionInputs[8].value
    };
    return fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedData)
    });
  }
}

/***/ }),

/***/ "./js/pages/admin/view.js":
/*!********************************!*\
  !*** ./js/pages/admin/view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  static ID = {
    SECTION: {
      SECTION: 'section'
    },
    BUTTONS: {
      USERS_BUTTON: 'users-button',
      RECORDS_BUTTON: 'records-button'
    },
    MODAL_WINDOW: {
      MODAL_WRAPPER: 'modal-wrapper'
    }
  };
  static JS_CLASSES = {
    PROFILE: {
      WRONG_INPUT: 'wrong-input',
      WRONG_SPAN: 'wrong-span'
    },
    COMMON: {
      HIDDEN: 'hidden',
      SELECTED: 'selected',
      LOCKED_INPUT: 'locked-input'
    }
  };
  getSectionElement() {
    return document.querySelector(`#${View.ID.SECTION.SECTION}`);
  }
  getUsersButtonElement() {
    return document.querySelector(`#${View.ID.BUTTONS.USERS_BUTTON}`);
  }
  getRecordsButtonElement() {
    return document.querySelector(`#${View.ID.BUTTONS.RECORDS_BUTTON}`);
  }
  getModalWrapperElement() {
    return document.querySelector(`#${View.ID.MODAL_WINDOW.MODAL_WRAPPER}`);
  }
  toggleClassHidden(element) {
    element.classList.toggle(`${View.JS_CLASSES.COMMON.HIDDEN}`);
  }
  toggleClassSelected(element) {
    if (element.classList.contains(`${View.JS_CLASSES.COMMON.SELECTED}`)) {
      element.disabled = false;
      element.classList.remove(`${View.JS_CLASSES.COMMON.SELECTED}`);
    } else {
      element.disabled = true;
      element.classList.add(`${View.JS_CLASSES.COMMON.SELECTED}`);
    }
  }
  toggleInputs(inputs) {
    inputs.forEach((input, index) => {
      if (index === 3 || index === 1) {
        return;
      }
      input.classList.toggle(`${View.JS_CLASSES.COMMON.LOCKED_INPUT}`);
    });
  }
  addClassWrongInput(element) {
    element.classList.add(View.JS_CLASSES.PROFILE.WRONG_INPUT);
  }
  createWrongSpanElement(element, message) {
    let warningSpan = document.createElement('span');
    warningSpan.innerText = message;
    warningSpan.classList.add(View.JS_CLASSES.PROFILE.WRONG_SPAN);
    element.parentNode.insertBefore(warningSpan, element.nextSibling);
  }
  clearClassWrongInputFromElements() {
    document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_INPUT}`).forEach(item => {
      item.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    });
  }
  clearClassWrongSpanFromElements() {
    document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_SPAN}`).forEach(item => {
      item.remove();
    });
  }
  displayUsersTable(data) {
    const section = this.getSectionElement();
    let dynamicData = '';
    data.data.forEach(user => {
      dynamicData += `
                    <tr>
                        <td class="table-td">${user.id}</td>
                        <td class="table-td">${user.nickname}</td>
                        <td class="table-td">${user.email}</td>
                        <td class="table-td">${user.role}</td>
                        <td class="table-td">
                        <button class="admin-button edit-user-button">details</button>
                        </td>
                    </tr>
                `;
    });
    section.innerHTML = `
        <table class="table">
            <thead class="table-head">
            <tr class="table-tr">
                <th class="table-th">ID</th>
                <th class="table-th">Nickname</th>
                <th class="table-th">Email</th>
                <th class="table-th">Role</th>
                <th class="table-th">Action</th>
            </tr>
            </thead>
            <tbody id="users-table-body">${dynamicData}</tbody>
        </table>`;
  }
  displayRecordsTable(data) {
    const section = this.getSectionElement();
    let dynamicData = '';
    data.data.forEach(record => {
      dynamicData += `
                <tr>
                    <td class="table-td">${record.id}</td>
                    <td class="table-td">${record.dreamTitle}</td>
                    <td class="table-td">${record.email}</td>
                    <td class="table-td">
                    <button class="admin-button edit-record-button">details</button>
                    </td>
                </tr>
            `;
    });
    section.innerHTML = `
        <table class="table">
            <thead class="table-head">
            <tr class="table-tr">
                <th class="table-th">ID</th>
                <th class="table-th">Dream title</th>
                <th class="table-th">Email</th>
                <th class="table-th">Action</th>
            </tr>
            </thead>
            <tbody id="users-table-body">${dynamicData}</tbody>
        </table>`;
  }
  displayUser(section, user) {
    let dunamicContentRoles = '';
    if (user.role === 'user') {
      dunamicContentRoles = `
            <option value="admin">Admin</option>
            <option value="user" selected>User</option>
            `;
    } else if (user.role === 'admin') {
      dunamicContentRoles = `
            <option value="admin" selected>Admin</option>
            <option value="user">User</option>
            `;
    }
    section.innerHTML = `                
        <button class="admin-button" id="return-button">Return</button>
        <div class="profile-avatar">
            <img src="${user.avatar}" class="user-avatar"
                id="profile-avatar"></img> 
        </div>
        <input type="text" placeholder="no image url" class="profile-input locked-input"
        id="avatar-url-input" value="${user.avatar}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${user.id}">
        <span class="profile-span">Nickname</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="nickname-input" value="${user.nickname}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${user.email}">
        <span class="profile-span">Role</span>
        <select class="profile-input locked-input" id="role-input">${dunamicContentRoles}</select>
        <span class="profile-span">Name</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="name-input" value="${user.name}">
        <span class="profile-span">Surname</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input"
            id="surname-input" value="${user.surname}">
        <span class="profile-span">Birth date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${user.birthDate}">
        <span class="profile-span">About me</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="about-input">${user.profileInfo}</textarea>
        <div class="button-block">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>`;
  }
  displayRecord(section, record) {
    let tags = '';
    for (let tag of record.dreamTags) {
      tags += `${tag}, `;
    }
    tags = tags.slice(0, -2);
    let likesUsersEmails = '';
    for (let email of record.likesUsersEmails) {
      likesUsersEmails += `${email}, `;
    }
    likesUsersEmails = likesUsersEmails.slice(0, -2);
    section.innerHTML = `                
        <button class="admin-button" id="return-button">Return</button>
        <div class="record-image">
            <img src="${record.dreamImageUrl}" class="record-image"
                id="record-image"></img> 
        </div>
        <input type="text" placeholder="no image url" class="profile-input locked-input"
        id="record-url-input" value="${record.dreamImageUrl}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${record.id}">
        <span class="profile-span">Title</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="nickname-input" value="${record.dreamTitle}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${record.email}">
        <span class="profile-span">Category</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="role-input" value="${record.dreamCategory}">
        <span class="profile-span">Mood</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="name-input" value="${record.dreamMood}">
        <span class="profile-span">Tages</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${tags}">
        <span class="profile-span">Plot</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="about-input" value="${record.dreamPlot}"></textarea>
        <span class="profile-span">Date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="TODO">
        <span class="profile-span">Views</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${record.views}">
        <span class="profile-span">Likes</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${record.likes}">
        <span class="profile-span">Like user emails</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${likesUsersEmails}">
        <div class="button-block">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
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
/*!*********************************!*\
  !*** ./js/pages/admin/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./js/pages/admin/model.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./js/pages/admin/view.js");
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller.js */ "./js/pages/admin/controller.js");





window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_1__["default"](), new _model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_admin.js.map