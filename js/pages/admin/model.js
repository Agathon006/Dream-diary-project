/**
 * admin model module.
 * @module js/pages/admin/model
 */
export default class Model {

    getPromiseGetAllUsers(page) {
        return fetch(`http://localhost:3000/users?_page=${page}&_per_page=10`)
    }

    getPromiseGetAllRecords(page) {
        return fetch(`http://localhost:3000/records?_page=${page}&_per_page=10`)
    }

    getPromiseGetUserById(id) {
        return fetch(`http://localhost:3000/users/${id}`)
    }

    getPromiseGetUserByNickname(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    getPromiseGetRecordById(id) {
        return fetch(`http://localhost:3000/records/${id}`)
    }

    getPromiseDeleteUserById(id) {
        return fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        })
    }

    getPromiseDeleteRecordById(id) {
        return fetch(`http://localhost:3000/records/${id}`, {
            method: 'DELETE',
        })
    }

    getPromiseEditUser(sectionInputs, userId) {
        const editedData = {
            "avatar": sectionInputs[0].value,
            "nickname": sectionInputs[2].value,
            "role": sectionInputs[4].value,
            "name": sectionInputs[5].value,
            "surname": sectionInputs[6].value,
            "birthDate": sectionInputs[7].value,
            "profileInfo": sectionInputs[8].value,
        };

        return fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
    }

    isPlotOkay(plot) {
        if (plot.value.length > 9 || plot.value.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    isDateOkay(date) {
        const recordDate = new Date(date.value),
            currentDate = new Date();

        if (recordDate <= currentDate) {
            return true;
        } else {
            return false;
        }
    }

    isViewsOkay(views) {
        return /^\d+$/.test(views);
    }

    getPromiseEditRecord(sectionInputs, recordId, recordTags) {
        const formattedRecordTags = [];
        for (let i = 0; i < recordTags.length; i++) {
            formattedRecordTags.push(recordTags[i].textContent.slice(0, -1).trim());
        };

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
            "views": sectionInputs[9].value,
        };

        return fetch(`http://localhost:3000/records/${recordId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
    }

}