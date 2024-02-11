export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initAdminPage();
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

    _initSectionListener() {
        const section = this.view.getSectionElement();
        section.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-user-button')) {
                this.model.getPromiseGetUserByEmail(event.target.parentNode.parentNode.children[2].innerText)
                    .then(response => response.json())
                    .then(data => {
                        this.view.displayUser(section, data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
            if (event.target.classList.contains('edit-record-button')) {
                this.model.getPromiseGetRecordByEmail(event.target.parentNode.parentNode.children[2].innerText)
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