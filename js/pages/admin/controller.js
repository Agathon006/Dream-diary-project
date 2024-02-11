export default class Controller {
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

        this.model.getPromiseGetAllUsers()
            .then(response => response.json())
            .then(data => {
                this.view.displayUsersTable(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    _initModalListener() {
        const modalWrapper = this.view.getModalWrapperElement(),
            section = this.view.getSectionElement();
        modalWrapper.addEventListener('click', (event) => {
            if (event.target.id === 'option-yes') {
                if (section.children[1].classList.contains('profile-avatar')) {
                    this.model.getPromiseDeleteUserById(section.children[4].value)
                        .then(response => response.json())
                        .then(data => {
                            this.view.toggleClassHidden(modalWrapper);
                            this.model.getPromiseGetAllUsers()
                                .then(response => response.json())
                                .then(data => {
                                    this.view.displayUsersTable(data);
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } else if (section.children[1].classList.contains('record-image')) {
                    this.model.getPromiseDeleteRecordById(section.children[4].value)
                        .then(response => response.json())
                        .then(data => {
                            this.view.toggleClassHidden(modalWrapper);
                            this.model.getPromiseGetAllRecords()
                                .then(response => response.json())
                                .then(data => {
                                    this.view.displayRecordsTable(data);
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        })
                        .catch(error => {
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
        section.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-user-button')) {
                this.model.getPromiseGetUserById(event.target.parentNode.parentNode.children[0].innerText)
                    .then(response => response.json())
                    .then(data => {
                        this.view.displayUser(section, data);
                        $('#datepicker').datepicker();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            if (event.target.classList.contains('edit-record-button')) {
                this.model.getPromiseGetRecordById(event.target.parentNode.parentNode.children[0].innerText)
                    .then(response => response.json())
                    .then(data => {
                        this.view.displayRecord(section, data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            if (event.target.id === 'return-button') {
                if (section.parentNode.children[0].children[0].classList.contains('selected')) {
                    this.model.getPromiseGetAllUsers()
                        .then(response => response.json())
                        .then(data => {
                            this.view.displayUsersTable(data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } else {
                    this.model.getPromiseGetAllRecords()
                        .then(response => response.json())
                        .then(data => {
                            this.view.displayRecordsTable(data);
                        })
                        .catch(error => {
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
                                this._isNewNicknameExist(sectionInputs[2], previousInputs, sectionInputs)
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
        this.model.getPromiseGetUserByNickname(nicknameInput.value)
            .then(response => response.json())
            .then(data => {
                if (data[0]) {
                    this.view.addClassWrongInput(nicknameInput);
                    this.view.createWrongSpanElement(nicknameInput, "This nickname is already exists");
                } else {
                    this._updateUserData(sectionInputs, previousInputs[1]);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    _updateUserData(sectionInputs, userId) {
        this.model.getPromiseEditUser(sectionInputs, userId)
            .then(response => response.json())
            .then(data => {
                this.model.getPromiseGetUserById(data.id)
                    .then(response => response.json())
                    .then(data => {
                        const section = this.view.getSectionElement();
                        this.view.displayUser(section, data);
                        $('#datepicker').datepicker();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    _initUsersButtonListener() {
        const usersButton = this.view.getUsersButtonElement(),
            recordsButton = this.view.getRecordsButtonElement();

        usersButton.addEventListener('click', () => {
            this.view.toggleClassSelected(usersButton);
            this.view.toggleClassSelected(recordsButton);

            this.model.getPromiseGetAllUsers()
                .then(response => response.json())
                .then(data => {
                    this.view.displayUsersTable(data);
                })
                .catch(error => {
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

            this.model.getPromiseGetAllRecords()
                .then(response => response.json())
                .then(data => {
                    this.view.displayRecordsTable(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

}