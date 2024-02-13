export default class Model {

    getPromiseGetAllUsers(page = 1) {
        return fetch(`http://localhost:3000/users?_page=${page}&_per_page=20`)
    }

    getPromiseGetAllRecords(page = 1) {
        return fetch(`http://localhost:3000/records?_page=${page}&_per_page=20`)
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

}