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

}