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
/**
 * admin controller module.
 * @module js/pages/admin/controller
 */
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  init() {
    this._initAdminPage();
    this._initModalListener();
    this._initUsersButtonListener();
    this._initRecordsButtonListener();
    this._initSectionListener();
  }

  /**
  Initializes the admin page by getting the users button element, toggling the selected class, and displaying all users. */
  _initAdminPage() {
    const usersOption = this.view.getUsersButtonElement();
    this.view.toggleClassSelected(usersOption);
    this._displayAllUsers();
  }

  /**
  Initializes event listener for modal elements */
  _initModalListener() {
    const modalWrapper = this.view.getModalWrapperElement(),
      section = this.view.getSectionElement();
    modalWrapper.addEventListener('click', event => {
      if (event.target.id === 'option-yes') {
        if (section.children[1].classList.contains('profile-avatar')) {
          this._deleteUser(modalWrapper, section);
        } else if (section.children[1].classList.contains('record-image')) {
          this._deleteRecord(modalWrapper, section);
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

  /**
  Deletes a user with the given ID and updates the users table in the view.
  @param {Element} modalWrapper - The modal wrapper element.
  @param {Element} section - The section element containing the user ID. */
  _deleteUser(modalWrapper, section) {
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
  }

  /**
  Deletes a record by id and re-fetches all records to update the UI
  @param {HTMLElement} modalWrapper - The modal wrapper element
  @param {HTMLElement} section - The section element containing the record to be deleted */
  _deleteRecord(modalWrapper, section) {
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

  /**
  Initialize listener for the users button on the view.
  Toggles selected class on the users and records buttons and displays all users when clicked.
  */
  _initUsersButtonListener() {
    const usersButton = this.view.getUsersButtonElement(),
      recordsButton = this.view.getRecordsButtonElement();
    usersButton.addEventListener('click', () => {
      this.view.toggleClassSelected(usersButton);
      this.view.toggleClassSelected(recordsButton);
      this._displayAllUsers();
    });
  }

  /**
  Initialize listener for the records button on the view.
  Toggles selected class on the users and records buttons and displays all records when clicked.
  */
  _initRecordsButtonListener() {
    const usersButton = this.view.getUsersButtonElement(),
      recordsButton = this.view.getRecordsButtonElement();
    recordsButton.addEventListener('click', () => {
      this.view.toggleClassSelected(usersButton);
      this.view.toggleClassSelected(recordsButton);
      this._displayAllRecords();
    });
  }

  /**
  Initialize listener for the section containing dynamic data using delegation
  */
  _initSectionListener() {
    const section = this.view.getSectionElement();
    let previousInputs = [],
      previousTags = [];
    section.addEventListener('click', event => {
      if (event.target.classList.contains('edit-user-button')) {
        this._displayUser(event.target.parentNode.parentNode.children[0].innerText);
      }
      if (event.target.classList.contains('edit-record-button')) {
        this._displayRecord(event.target.parentNode.parentNode.children[0].innerText);
      }
      if (event.target.id === 'pagination-switcher-button-prev') {
        const curentPageNumberElement = this.view.getCurrentPageNumberElement();
        if (section.parentNode.children[0].children[0].classList.contains('selected')) {
          this._displayAllUsers(+curentPageNumberElement.innerText - 1);
        } else {
          this._displayAllRecords(+curentPageNumberElement.innerText - 1);
        }
      }
      if (event.target.id === 'pagination-switcher-button-next') {
        const curentPageNumberElement = this.view.getCurrentPageNumberElement();
        if (section.parentNode.children[0].children[0].classList.contains('selected')) {
          this._displayAllUsers(+curentPageNumberElement.innerText + 1);
        } else {
          this._displayAllRecords(+curentPageNumberElement.innerText + 1);
        }
      }
      if (event.target.id === 'return-button') {
        if (section.parentNode.children[0].children[0].classList.contains('selected')) {
          this._displayAllUsers();
        } else {
          this._displayAllRecords();
        }
      }
      if (event.target.classList.contains('delete-button')) {
        const modalWrapper = this.view.getModalWrapperElement();
        this.view.toggleClassHidden(modalWrapper);
      }
      if (event.target.classList.contains('edit-button') && event.target.innerText === 'Edit') {
        const sectionInputs = [];
        previousInputs = [], previousTags = [];
        for (let child of section.children) {
          if (child.classList.contains('profile-input')) {
            sectionInputs.push(child);
            previousInputs.push(child.value);
          }
          if (child.classList.contains('tags-container')) {
            for (let tag of child.children) {
              previousTags.push(tag);
            }
          }
        }
        this.view.toggleInputs(sectionInputs);
        const tagsCloseButtons = this.view.getAllTagsCloseButtons();
        for (let button of tagsCloseButtons) {
          this.view.toggleClassNotExist(button);
        }
        ;
        event.target.innerText = 'Save';
      } else if (event.target.classList.contains('edit-button') && event.target.innerText === 'Save') {
        const sectionInputs = [],
          recordTags = [];
        for (let child of section.children) {
          if (child.classList.contains('profile-input')) {
            sectionInputs.push(child);
          }
          if (child.classList.contains('tags-container')) {
            for (let tag of child.children) {
              recordTags.push(tag);
            }
          }
        }
        if (previousInputs.every((value, index) => {
          if (index !== 6) {
            return value === sectionInputs[index].value;
          }
          return true;
        })) {
          if (recordTags.length === previousTags.length) {
            let arraysAreEqual = true;
            for (let i = 0; i < recordTags.length; i++) {
              if (previousTags[i].textContent.slice(0, -1).trim() !== recordTags[i].textContent.slice(0, -1).trim()) {
                arraysAreEqual = false;
                break;
              }
            }
            ;
            if (arraysAreEqual) {
              this.view.toggleInputs(sectionInputs);
              const tagsCloseButtons = this.view.getAllTagsCloseButtons();
              section.children[14].value = '';
              for (let button of tagsCloseButtons) {
                this.view.toggleClassNotExist(button);
              }
              ;
              event.target.innerText = 'Edit';
            } else {
              this._initHandleSave(previousInputs, sectionInputs, recordTags);
            }
          } else {
            this._initHandleSave(previousInputs, sectionInputs, recordTags);
          }
        } else {
          this._initHandleSave(previousInputs, sectionInputs, recordTags);
        }
      }
    });
  }

  /**
  Display user information by fetching user data from the model based on the provided ID.
  Also initializes a datepicker for a specific element on the view.
  @param {number} id - The ID of the user to display. */
  _displayUser(id) {
    this.model.getPromiseGetUserById(id).then(response => response.json()).then(data => {
      this.view.displayUser(section, data);
      $('#datepicker').datepicker();
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  /**
  Display record information by fetching record data from the model based on the provided ID.
  Also initializes a datepicker for a specific element on the view.
  @param {number} id - The ID of the record to display. */
  _displayRecord(id) {
    this.model.getPromiseGetRecordById(id).then(response => response.json()).then(data => {
      this.view.displayRecord(section, data);
      $('#datepicker').datepicker();
      const tagsCloseButtons = this.view.getAllTagsCloseButtons();
      for (let button of tagsCloseButtons) {
        this.view.toggleClassNotExist(button);
      }
      ;
      this._initTagsInputListener();
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  /**
  Display all users on the page with pagination controls based on the current page number.
  @param {number} currentPageNumber - The current page number to display users on.
  */
  _displayAllUsers(currentPageNumber = 1) {
    this.model.getPromiseGetAllUsers(currentPageNumber).then(response => response.json()).then(data => {
      this.view.displayPaginationPart(data.data.length, data.pages, currentPageNumber);
      const buttonPrev = this.view.getButtonPrevElement(),
        buttonNext = this.view.getButtonNextElement();
      if (data.prev === null) {
        this.view.toggleClassHidden(buttonPrev);
      } else if (buttonPrev.classList.contains('hidden')) {
        this.view.toggleClassHidden(buttonPrev);
      }
      if (data.next === null) {
        this.view.toggleClassHidden(buttonNext);
      } else if (buttonNext.classList.contains('hidden')) {
        this.view.toggleClassHidden(buttonNext);
      }
      this.view.displayUsersTable(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  /**
  Display all records on the page with pagination controls based on the current page number.
  @param {number} currentPageNumber - The current page number to display records on.
  */
  _displayAllRecords(currentPageNumber = 1) {
    this.model.getPromiseGetAllRecords(currentPageNumber).then(response => response.json()).then(data => {
      this.view.displayPaginationPart(data.data.length, data.pages, currentPageNumber);
      const buttonPrev = this.view.getButtonPrevElement(),
        buttonNext = this.view.getButtonNextElement();
      if (data.prev === null) {
        this.view.toggleClassHidden(buttonPrev);
      } else if (buttonPrev.classList.contains('hidden')) {
        this.view.toggleClassHidden(buttonPrev);
      }
      if (data.next === null) {
        this.view.toggleClassHidden(buttonNext);
      } else if (buttonNext.classList.contains('hidden')) {
        this.view.toggleClassHidden(buttonNext);
      }
      this.view.displayRecordsTable(data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  /**
  Initializes handling of save for user profile updates
  @param {Array} previousInputs - The previous user inputs
  @param {Array} sectionInputs - The current section inputs
  @param {Array} recordTags - The tags associated with the record */
  _initHandleSave(previousInputs, sectionInputs, recordTags) {
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
      if (this._isRecordValidationOkay(sectionInputs)) {
        this.view.clearClassWrongInputFromElements();
        this.view.clearClassWrongSpanFromElements();
        this._updateRecordData(sectionInputs, previousInputs[1], recordTags);
      }
    }
  }

  /**
  Initializes the listener for the tags input field on the record form.
  Allows users to add tags by pressing Enter or comma key.
  Also handles removing tags when the close button is clicked.
  */
  _initTagsInputListener() {
    $('#record-form-tags-input').on('keyup', function (event) {
      if (event.key === 'Enter' || event.key === ',') {
        var tag = $(this).val().trim().replace(/,+$/, '');
        if (tag) {
          $('#record-form-tags-container').append('<span class="badge badge-primary mr-1">' + tag + ' <button class="close" type="button" aria-label="Close"><span aria-hidden="true">&times;</span></button></span>');
        }
        $(this).val('');
        if (document.querySelectorAll('.badge').length > 4) {
          $('#record-form-tags-input').prop('disabled', true);
        }
      }
    });
    $(document).on('click', '.close', function () {
      $(this).parent().remove();
      $('#record-form-tags-input').prop('disabled', false);
    });
  }

  /**
  Checks if user input validation is okay.
  @param {Array} inputs - An array of input elements.
  @returns {boolean} - Returns true if validation is okay, false otherwise. */
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

  /**
  Checks if a new nickname already exists in the database.
  If the nickname already exists, it adds a wrong input class and creates a wrong span element.
  If the nickname is unique, it updates the user data.
  @param {Element} nicknameInput - The input element for the new nickname.
  @param {Array} previousInputs - An array of previous input elements.
  @param {Array} sectionInputs - An array of input elements in the current section. */
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

  /**
  Updates user data based on section inputs and user ID
  @param {Object} sectionInputs - The inputs from the section to update user data
  @param {number} userId - The ID of the user to update */
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

  /**
  Checks if record input validation is okay.
  @param {Array} inputs - An array of input elements.
  @returns {boolean} - Returns true if validation is okay, false otherwise. */
  _isRecordValidationOkay(inputs) {
    let isValidationOkay = true;
    this.view.clearClassWrongInputFromElements();
    this.view.clearClassWrongSpanFromElements();
    if (!this.model.isPlotOkay(inputs[7])) {
      this.view.addClassWrongInput(inputs[7]);
      this.view.createWrongSpanElement(inputs[7], "Dream description must have at least 10 symbols");
      isValidationOkay = false;
    }
    if (!this.model.isDateOkay(inputs[8])) {
      this.view.addClassWrongInput(inputs[8]);
      this.view.createWrongSpanElement(inputs[8], "Put correct date");
      isValidationOkay = false;
    }
    if (!this.model.isViewsOkay(inputs[9].value)) {
      this.view.addClassWrongInput(inputs[9]);
      this.view.createWrongSpanElement(inputs[9], "Must be integer number");
      isValidationOkay = false;
    }
    return isValidationOkay;
  }

  /**
  Updates record data by calling API to edit record and then fetches the updated record
  by using the record id.
  @param {Object} sectionInputs - The input data for updating the record section
  @param {number} recordId - The unique identifier of the record
  @param {Array} recordTags - The tags associated with the record */
  _updateRecordData(sectionInputs, recordId, recordTags) {
    this.model.getPromiseEditRecord(sectionInputs, recordId, recordTags).then(response => response.json()).then(data => {
      this.model.getPromiseGetRecordById(data.id).then(response => response.json()).then(data => {
        const section = this.view.getSectionElement();
        this.view.displayRecord(section, data);
        $('#datepicker').datepicker();
        const tagsCloseButtons = this.view.getAllTagsCloseButtons();
        for (let button of tagsCloseButtons) {
          this.view.toggleClassNotExist(button);
        }
        ;
        this._initTagsInputListener();
      }).catch(error => {
        console.error('Error:', error);
      });
    }).catch(error => {
      console.error('Error:', error);
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
/**
 * admin model module.
 * @module js/pages/admin/model
 */
class Model {
  /**
  Fetches all users from the server with pagination.
  @param {number} page - The page number for pagination.
  @return {Promise} A Promise object representing the result of the fetch request. */
  getPromiseGetAllUsers(page) {
    return fetch(`http://localhost:3000/users?_page=${page}&_per_page=10`);
  }

  /**
  Fetches all records from the server with pagination.
  @param {number} page - The page number for pagination.
  @return {Promise} A Promise object representing the result of the fetch request. */
  getPromiseGetAllRecords(page) {
    return fetch(`http://localhost:3000/records?_page=${page}&_per_page=10`);
  }

  /**
  Fetches a user from the server by its ID.
  @param {number} id - The ID of the user to fetch.
  @return {Promise} A Promise object representing the result of the fetch request. */
  getPromiseGetUserById(id) {
    return fetch(`http://localhost:3000/users/${id}`);
  }

  /**
  Fetches a user from the server by its nickname.
  @param {string} nickname - The nickname of the user to fetch.
  @return {Promise} A Promise object representing the result of the fetch request. */
  getPromiseGetUserByNickname(nickname) {
    return fetch(`http://localhost:3000/users?nickname=${nickname}`);
  }

  /**
  Fetches a record from the server by its ID.
  @param {number} id - The ID of the record to fetch.
  @return {Promise} A Promise object representing the result of the fetch request. */
  getPromiseGetRecordById(id) {
    return fetch(`http://localhost:3000/records/${id}`);
  }

  /**
  Fetches a DELETE request to delete a user by ID from the server
  @param {number} id - The ID of the user to delete
  @returns {Promise<Response>} A promise that resolves with the server response */
  getPromiseDeleteUserById(id) {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    });
  }

  /**
  Fetches a DELETE request to delete a record by ID from the server
  @param {number} id - The ID of the record to delete
  @returns {Promise<Response>} A promise that resolves with the server response */
  getPromiseDeleteRecordById(id) {
    return fetch(`http://localhost:3000/records/${id}`, {
      method: 'DELETE'
    });
  }

  /**
  Retrieves a promise to edit user information.
  @param {Array} sectionInputs - Array of input fields containing user information.
  @param {number} userId - The ID of the user to edit.
  @returns {Promise} - A Promise that resolves with the result of the edit operation. */
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

  /**
  Checks if the length of the provided plot is greater than 9 or empty.
  @param {string} plot - The plot text to be checked.
  @returns {boolean} - Returns true if the plot length is greater than 9 or empty, false otherwise. */
  isPlotOkay(plot) {
    if (plot.value.length > 9 || plot.value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
  Checks if the provided date is before or equal to the current date.
  @param {string} date - The date value to be checked.
  @returns {boolean} - Returns true if the date is before or equal to the current date, false otherwise.
  */
  isDateOkay(date) {
    const recordDate = new Date(date.value),
      currentDate = new Date();
    if (recordDate <= currentDate) {
      return true;
    } else {
      return false;
    }
  }

  /**
  Checks if the provided views is a valid number.
  @param {string} views - The views value to be checked.
  @returns {boolean} - Returns true if the views value is a number, false otherwise. */
  isViewsOkay(views) {
    return /^\d+$/.test(views);
  }
  /**
  
  Retrieves a promise for editing a record based on the provided inputs.
  @param {HTMLElement[]} sectionInputs - An array of input elements within a section.
  @param {string} recordId - The ID of the record to be edited.
  @param {HTMLElement[]} recordTags - An array of tag elements associated with the record.
  @returns {Promise} A promise that resolves when the record is successfully edited. */
  getPromiseEditRecord(sectionInputs, recordId, recordTags) {
    const formattedRecordTags = [];
    for (let i = 0; i < recordTags.length; i++) {
      formattedRecordTags.push(recordTags[i].textContent.slice(0, -1).trim());
    }
    ;
    const parts = sectionInputs[8].value.split('/');
    const date = {
      dayNumber: parseInt(parts[1]),
      monthNumber: parseInt(parts[0]) - 1,
      year: parseInt(parts[2]),
      weekNumber: new Date(parts[2], parts[0] - 1, parts[1]).getDay()
    };
    const editedData = {
      "dreamImageUrl": sectionInputs[0].value,
      "dreamTitle": sectionInputs[2].value,
      "dreamCategory": sectionInputs[4].value,
      "dreamMood": sectionInputs[5].value,
      "dreamTags": formattedRecordTags,
      "dreamPlot": sectionInputs[7].value,
      "date": date,
      "views": sectionInputs[9].value
    };
    return fetch(`http://localhost:3000/records/${recordId}`, {
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
/**
 * admin view module.
 * @module js/pages/admin/view
 */
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
    },
    PAGINATION: {
      BUTTON_PREV: 'pagination-switcher-button-prev',
      CURRENT_PAGE_NUMBER: 'current-page-number',
      BUTTON_NEXT: 'pagination-switcher-button-next'
    }
  };
  static JS_CLASSES = {
    PROFILE: {
      WRONG_INPUT: 'wrong-input',
      WRONG_SPAN: 'wrong-span'
    },
    RECORD: {
      TAGS: {
        CLOSE_BUTTON: 'close'
      }
    },
    COMMON: {
      HIDDEN: 'hidden',
      NOT_EXIST: 'not-exist',
      SELECTED: 'selected',
      LOCKED_INPUT: 'locked-input'
    }
  };

  /**
  Gets the section element.
  @returns {Element} - The section element. */
  getSectionElement() {
    return document.querySelector(`#${View.ID.SECTION.SECTION}`);
  }

  /**
  Gets the users button element.
  @returns {Element} - The users button element. */
  getUsersButtonElement() {
    return document.querySelector(`#${View.ID.BUTTONS.USERS_BUTTON}`);
  }

  /**
  Gets the records button element.
  @returns {Element} - The records button element. */
  getRecordsButtonElement() {
    return document.querySelector(`#${View.ID.BUTTONS.RECORDS_BUTTON}`);
  }

  /**
  Gets the modal wrapper element.
  @returns {Element} - The modal wrapper element. */
  getModalWrapperElement() {
    return document.querySelector(`#${View.ID.MODAL_WINDOW.MODAL_WRAPPER}`);
  }

  /**
  Gets all tags close buttons elements.
  @returns {NodeList} - List of all tags close buttons elements. */
  getAllTagsCloseButtons() {
    return document.querySelectorAll(`.${View.JS_CLASSES.RECORD.TAGS.CLOSE_BUTTON}`);
  }

  /**
  Gets the previous button element for pagination.
  @returns {Element} - The previous button element for pagination. */
  getButtonPrevElement() {
    return document.querySelector(`#${View.ID.PAGINATION.BUTTON_PREV}`);
  }

  /**
  Gets the current page number element for pagination.
  @returns {Element} - The current page number element for pagination. */
  getCurrentPageNumberElement() {
    return document.querySelector(`#${View.ID.PAGINATION.CURRENT_PAGE_NUMBER}`);
  }

  /**
  Retrieves the next button element from the DOM
  @returns {Element} The next button element */
  getButtonNextElement() {
    return document.querySelector(`#${View.ID.PAGINATION.BUTTON_NEXT}`);
  }

  /**
  Toggles the hidden class on an element
  @param {Element} element - The element to toggle the hidden class on */
  toggleClassHidden(element) {
    element.classList.toggle(`${View.JS_CLASSES.COMMON.HIDDEN}`);
  }

  /**
  Toggles the not exist class on an element
  @param {Element} element - The element to toggle the not exist class on */
  toggleClassNotExist(element) {
    element.classList.toggle(`${View.JS_CLASSES.COMMON.NOT_EXIST}`);
  }

  /**
  Toggles the selected class on an element and enables/disables it based on the class state
  @param {Element} element - The element to toggle the selected class on */
  toggleClassSelected(element) {
    if (element.classList.contains(`${View.JS_CLASSES.COMMON.SELECTED}`)) {
      element.disabled = false;
      element.classList.remove(`${View.JS_CLASSES.COMMON.SELECTED}`);
    } else {
      element.disabled = true;
      element.classList.add(`${View.JS_CLASSES.COMMON.SELECTED}`);
    }
  }

  /**
  Toggles the class of specified input elements based on their index.
  @param {Array} inputs - An array of input elements. */
  toggleInputs(inputs) {
    inputs.forEach((input, index) => {
      if (index === 1 || index === 3 || index === 10 || index === 11) {
        return;
      }
      input.classList.toggle(`${View.JS_CLASSES.COMMON.LOCKED_INPUT}`);
    });
  }

  /**
  Adds a specific class to the element to indicate a wrong input.
  @param {Element} element - The element to add the class to. */
  addClassWrongInput(element) {
    element.classList.add(View.JS_CLASSES.PROFILE.WRONG_INPUT);
  }

  /**
  Creates a span element with a warning message and inserts it after the specified element.
  @param {Element} element - The element to insert the warning span after.
  @param {string} message - The message to display in the warning span. */
  createWrongSpanElement(element, message) {
    let warningSpan = document.createElement('span');
    warningSpan.innerText = message;
    warningSpan.classList.add(View.JS_CLASSES.PROFILE.WRONG_SPAN);
    element.parentNode.insertBefore(warningSpan, element.nextSibling);
  }

  /**
  Clears the class "wrong input" from all elements with that class. */
  clearClassWrongInputFromElements() {
    document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_INPUT}`).forEach(item => {
      item.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    });
  }

  /**
  Removes all elements with the class "wrong span" from the DOM. */
  clearClassWrongSpanFromElements() {
    document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_SPAN}`).forEach(item => {
      item.remove();
    });
  }

  /**
  Displays the pagination part of the profile page.
  @param {number} itemsNumber - The total number of items to display.
  @param {number} pagesNumber - The total number of pages to show in pagination.
  @param {number} currentPageNumber - The current page number (default is 1).
  */
  displayPaginationPart(itemsNumber, pagesNumber, currentPageNumber = 1) {
    const section = this.getSectionElement();
    let dynamicContent = '';
    itemsNumber === 1 ? dynamicContent = 'item' : dynamicContent = 'items';
    section.innerHTML = `<div class="pagination-switcher">
            <button class="pagination-switcher__button" id="pagination-switcher-button-prev"><</button>
            <div class="pagination-switcher__plot">
                <div class="pagination-switcher__plot-top">
                    <span class="pagination-switcher__plot-text">Found: </span>
                    <span class="pagination-switcher__plot-key">${itemsNumber}</span>
                    <span class="pagination-switcher__plot-text"> ${dynamicContent}</span>
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

  /**
  Display users table based on the provided data
  @param {object} data - The data containing user information
  @returns {void}
  */
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
    section.innerHTML += `
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

  /**
   * Renders a table of records based on the provided data.
   * @param {Object} data - The data object containing records to be displayed.
   */
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
    section.innerHTML += `
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

  /**
   * Renders a user's information in a specific section with options to select user roles.
   * 
   * @param {HTMLElement} section - The HTML element where the user information will be displayed.
   * @param {Object} user - The user object containing information to be displayed.
   */
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

  /**
  Displays the record with the given section and record details.
  @param {HTMLElement} section - The section element where the record will be displayed.
  @param {Object} record - The record object containing the details to be displayed. */
  displayRecord(section, record) {
    let dynamicRecordDate = '';
    let month = record.date.monthNumber,
      day = record.date.dayNumber;
    if (++record.date.monthNumber < 10) {
      month = `0${record.date.monthNumber}`;
    }
    if (record.date.dayNumber < 10) {
      day = `0${record.date.dayNumber}`;
    }
    dynamicRecordDate = `${month}/${day}/${record.date.year}`;
    let dynamicUsersEmailsLength = '';
    if (record.likesUsersEmails.length === 0) {
      dynamicUsersEmailsLength = `no emails`;
    } else if (record.likesUsersEmails.length === 1) {
      dynamicUsersEmailsLength = `${record.likesUsersEmails.length} email`;
    } else {
      dynamicUsersEmailsLength = `${record.likesUsersEmails.length} emails`;
    }
    let dunamicContentCategories = '';
    switch (record.dreamCategory) {
      case 'Usual':
        dunamicContentCategories = `
                <option value="Usual" selected>Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
        break;
      case 'Just talking':
        dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking" selected>Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
        break;
      case 'Nightmare':
        dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare" selected>Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
        break;
      case 'Action':
        dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action" selected>Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
        break;
      case 'Trash':
        dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash" selected>Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
        break;
      case 'Conscious dream':
        dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream" selected>Conscious dream</option>
                `;
        break;
    }
    let dunamicContentMoods = '';
    switch (record.dreamMood) {
      case 'Typical dream':
        dunamicContentMoods = `
                <option value="Typical dream" selected>Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
        break;
      case 'Fun dream':
        dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream" selected>Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
        break;
      case 'Sad dream':
        dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream" selected>Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
        break;
      case 'Terrible':
        dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible" selected>Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
        break;
      case 'Made me think':
        dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think" selected>Made me think</option>
                `;
        break;
    }
    section.innerHTML = `                
        <button class="admin-button" id="return-button">Return</button>
        <div class="record-image">
            <img src="${record.dreamImageUrl}" class="record-image"
                id="record-image"></img> 
        </div>
        <input type="text" placeholder="no image url" maxlength="500" class="profile-input locked-input"
        id="record-url-input" value="${record.dreamImageUrl}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${record.id}">
        <span class="profile-span">Title</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="title-input" value="${record.dreamTitle}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${record.email}">
        <span class="profile-span">Category</span>
        <select class="profile-input locked-input" id="category-input">${dunamicContentCategories}</select>
        <span class="profile-span">Mood</span>
        <select class="profile-input locked-input" id="moods-input">${dunamicContentMoods}</select>
        <span class="profile-span">Tags (1-5)</span>
        <textarea name="dreamTags" rows="2" placeholder="love milk, bread, my cheese" maxlength="250"
            class="profile-input locked-input" id="record-form-tags-input"></textarea>
        <div class="record-form__input-plot tags-container" id="record-form-tags-container"></div>
        <span class="profile-span">Plot</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="plot-input" value="${record.dreamPlot}"></textarea>
        <span class="profile-span">Date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${dynamicRecordDate}">
        <span class="profile-span">Views</span>
        <input type="text" placeholder="empty" maxlength="50" id="views-input"
            class="datepicker profile-input locked-input" value="${record.views}">
        <span class="profile-span">Likes</span>
        <input type="text" placeholder="empty" id="likes-input"
            class="datepicker profile-input locked-input" value="${record.likes}">
        <span class="profile-span">Like user emails</span>
        <input type="text" placeholder="empty" id="likes-user-emails-input"
            class="datepicker profile-input locked-input" value="${dynamicUsersEmailsLength}">
        <div class="button-block">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>`;
    for (let tag of record.dreamTags) {
      $('#record-form-tags-container').append('<span class="badge badge-primary mr-1">' + tag + ' <button class="close" type="button" aria-label="Close"><span aria-hidden="true">&times;</span></button></span>');
    }
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


/**
 * admin index module.
 * @module js/pages/admin/index
 */



window.addEventListener('DOMContentLoaded', () => {
  new _controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](new _view_js__WEBPACK_IMPORTED_MODULE_1__["default"](), new _model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle_admin.js.map