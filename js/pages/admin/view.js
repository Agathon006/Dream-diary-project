export default class View {

    static ID = {
        SECTION: {
            SECTION: 'section',
        },
        BUTTONS: {
            USERS_BUTTON: 'users-button',
            RECORDS_BUTTON: 'records-button',
        },
        MODAL_WINDOW: {
            MODAL_WRAPPER: 'modal-wrapper',
        },
    }

    static JS_CLASSES = {
        PROFILE: {
            WRONG_INPUT: 'wrong-input',
            WRONG_SPAN: 'wrong-span',
        },
        COMMON: {
            HIDDEN: 'hidden',
            SELECTED: 'selected',
            LOCKED_INPUT: 'locked-input',
        },
    }

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