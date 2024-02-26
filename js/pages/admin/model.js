/**
 * admin model module.
 * @module js/pages/admin/model
 */
export default class Model {

    /**
    Fetches all users from the server with pagination.
    @param {number} page - The page number for pagination.
    @return {Promise} A Promise object representing the result of the fetch request. */
    getPromiseGetAllUsers(page) {
        return fetch(`http://localhost:3000/users?_page=${page}&_per_page=10`)
    }

    /**
    Fetches all records from the server with pagination.
    @param {number} page - The page number for pagination.
    @return {Promise} A Promise object representing the result of the fetch request. */
    getPromiseGetAllRecords(page) {
        return fetch(`http://localhost:3000/records?_page=${page}&_per_page=10`)
    }

    /**
    Fetches a user from the server by its ID.
    @param {number} id - The ID of the user to fetch.
    @return {Promise} A Promise object representing the result of the fetch request. */
    getPromiseGetUserById(id) {
        return fetch(`http://localhost:3000/users/${id}`)
    }

    /**
    Fetches a user from the server by its nickname.
    @param {string} nickname - The nickname of the user to fetch.
    @return {Promise} A Promise object representing the result of the fetch request. */
    getPromiseGetUserByNickname(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    /**
    Fetches a record from the server by its ID.
    @param {number} id - The ID of the record to fetch.
    @return {Promise} A Promise object representing the result of the fetch request. */
    getPromiseGetRecordById(id) {
        return fetch(`http://localhost:3000/records/${id}`)
    }

    /**
    Fetches a DELETE request to delete a user by ID from the server
    @param {number} id - The ID of the user to delete
    @returns {Promise<Response>} A promise that resolves with the server response */
    getPromiseDeleteUserById(id) {
        return fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        })
    }

    /**
    Fetches a DELETE request to delete a record by ID from the server
    @param {number} id - The ID of the record to delete
    @returns {Promise<Response>} A promise that resolves with the server response */
    getPromiseDeleteRecordById(id) {
        return fetch(`http://localhost:3000/records/${id}`, {
            method: 'DELETE',
        })
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