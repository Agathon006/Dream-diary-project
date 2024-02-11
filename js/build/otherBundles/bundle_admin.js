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
    section.addEventListener('click', event => {
      if (event.target.classList.contains('edit-user-button')) {
        this.model.getPromiseGetUserById(event.target.parentNode.parentNode.children[0].innerText).then(response => response.json()).then(data => {
          this.view.displayUser(section, data);
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
    REGISTER_FORM: {
      // WRONG_INPUT: 'wrong-input',
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
    element.classList.toggle('hidden');
  }
  toggleClassSelected(element) {
    if (element.classList.contains('selected')) {
      element.disabled = false;
      element.classList.remove('selected');
    } else {
      element.disabled = true;
      element.classList.add('selected');
    }
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
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="role-input" value="${user.role}">
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
            class="profile-input locked-input" id="about-input" value="${user.profileInfo}"></textarea>
        <div class="button-block">
            <button class="admin-button">Edit</button>
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
        id="avatar-url-input" value="${record.dreamImageUrl}">
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
            <button class="admin-button">Edit</button>
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