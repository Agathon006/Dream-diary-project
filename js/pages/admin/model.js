export default class Model {

    getPromiseGetAllUsers(page = 1) {
        return fetch(`http://localhost:3000/users?_page=${page}&_per_page=20`)
    }

    getPromiseGetAllRecords(page = 1) {
        return fetch(`http://localhost:3000/records?_page=${page}&_per_page=20`)
    }

    getPromiseGetUserByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    getPromiseGetRecordByEmail(email) {
        return fetch(`http://localhost:3000/records?email=${email}`)
    }

}