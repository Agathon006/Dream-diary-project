export default class View {

    static ID = {
        SECTION: {
            SECTION: 'section',
        },
        BUTTONS: {
            USERS_BUTTON: 'users-button',
            RECORDS_BUTTON: 'records-button',
        },
    }

    static JS_CLASSES = {
        REGISTER_FORM: {
            // WRONG_INPUT: 'wrong-input',
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

    toggleClassSelected(element) {
        element.classList.toggle('selected');
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
        <div class="profile-main__avatar">
            <img src="${user[0].avatar}" class="user-avatar"
                id="profile-main-avatar"></img> 
        </div>
        <input type="text" placeholder="no image url" class="profile-input locked-input"
        id="avatar-url-input" value="${user[0].avatar}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${user[0].id}">
        <span class="profile-span">Nickname</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="nickname-input" value="${user[0].nickname}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${user[0].email}">
        <span class="profile-span">Role</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="role-input" value="${user[0].role}">
        <span class="profile-span">Name</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="name-input" value="${user[0].name}">
        <span class="profile-span">Surname</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input"
            id="surname-input" value="${user[0].surname}">
        <span class="profile-span">Birth date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${user[0].birthDate}">
        <span class="profile-span">About me</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="about-input" value="${user[0].profileInfo}"></textarea>
        <div class="button-block">
            <button class="admin-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>`;
    }

    displayRecord(section, record) {

        let tags = '';
        for (let tag of record[0].dreamTags) {
            tags += `${tag}, `;
        }
        tags = tags.slice(0, -2);

        let likesUsersEmails = '';
        for (let email of record[0].likesUsersEmails) {
            likesUsersEmails += `${email}, `;
        }
        likesUsersEmails = likesUsersEmails.slice(0, -2);

        section.innerHTML = `                
        <button class="admin-button" id="return-button">Return</button>
        <div class="profile-main__avatar">
            <img src="${record[0].dreamImageUrl}" class="record-image"
                id="profile-main-avatar"></img> 
        </div>
        <input type="text" placeholder="no image url" class="profile-input locked-input"
        id="avatar-url-input" value="${record[0].dreamImageUrl}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${record[0].id}">
        <span class="profile-span">Title</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="nickname-input" value="${record[0].dreamTitle}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${record[0].email}">
        <span class="profile-span">Category</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="role-input" value="${record[0].dreamCategory}">
        <span class="profile-span">Mood</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="name-input" value="${record[0].dreamMood}">
        <span class="profile-span">Tages</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${tags}">
        <span class="profile-span">Plot</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="about-input" value="${record[0].dreamPlot}"></textarea>
        <span class="profile-span">Date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="TODO">
        <span class="profile-span">Views</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${record[0].views}">
        <span class="profile-span">Likes</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${record[0].likes}">
        <span class="profile-span">Like user emails</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${likesUsersEmails}">
        <div class="button-block">
            <button class="admin-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>`;
    }
}