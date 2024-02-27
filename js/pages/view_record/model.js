/**
 * view_record page model module.
 * @module js/pages/view_record/model
 */
export default class Model {

    /**
    Updates the number of views for a specific record in the database.
    @param {number} id - The ID of the record to update.
    @param {number} newNumber - The new number of views for the record.
    @returns {Promise} A promise that resolves once the update is complete. */
    getPromiseChangeRecordViews(id, newNumber) {
        return fetch(`http://localhost:3000/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                views: newNumber,
            }),
        })
    }

    /**
    Updates the number of likes and the list of users who liked a specific record in the database.
    @param {number} id - The ID of the record to update.
    @param {number} newNumber - The new number of likes for the record.
    @param {Array} newUsersEmails - An array of user emails who liked the record.
    @returns {Promise} A promise that resolves once the update is complete. */
    getPromiseChangeRecordLikesAndLikesUsers(id, newNumber, newUsersEmails) {
        return fetch(`http://localhost:3000/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                likes: newNumber,
                likesUsersEmails: newUsersEmails,
            }),
        })
    }

    /**
    Retrieves a promise to get dream records by ID
    @param {number} id - The ID of the dream record
    @returns {Promise} A promise to fetch the dream records */
    getPromiseGetDreamRecords(id) {
        return fetch(`http://localhost:3000/records/${id}`)
    }

    /**
    Retrieves a promise to get a user by email
    @param {string} email - The email of the user
    @returns {Promise} A promise to fetch the user by email */
    getPromiseGetUserByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    /**
    Determines the month name based on the month number
    @param {number} monthNumber - The number representing the month (0-11)
    @returns {string} The name of the month */
    whichMonthNameByNumber(monthNumber) {

        switch (monthNumber) {
            case 0:
                return 'January'
            case 1:
                return 'February'
            case 2:
                return 'March'
            case 3:
                return 'April'
            case 4:
                return 'May'
            case 5:
                return 'June'
            case 6:
                return 'July'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'October'
            case 10:
                return 'November'
            case 11:
                return 'December'
            default:
                console.log('No such month')
        }
    }

    /**
    Returns the icon path based on the dream category name
    @param {string} categoryName - The name of the dream category
    @returns {string} - The icon path for the dream category
    */
    whichDreamCategoryIcon(categoryName) {

        switch (categoryName) {
            case 'Category':
                return '../icons/make_record/dream_category/select.svg'
            case 'Usual':
                return '../icons/make_record/dream_category/usual.svg'
            case 'Just talking':
                return '../icons/make_record/dream_category/just_talking.svg'
            case 'Nightmare':
                return '../icons/make_record/dream_category/nightmare.svg'
            case 'Action':
                return '../icons/make_record/dream_category/action.svg'
            case 'Trash':
                return '../icons/make_record/dream_category/trash.svg'
            case 'Conscious dream':
                return '../icons/make_record/dream_category/conscious_dream.svg'
            default:
                console.log('No such option in select dream category')
        }
    }

    /**
    Returns the icon path based on the dream mood name
    @param {string} moodName - The name of the dream mood
    @returns {string} - The icon path for the dream mood
    */
    whichDreamMoodIcon(moodName) {

        switch (moodName) {
            case 'Typical dream':
                return '../icons/make_record/dream_mood/typical_dream.svg'
            case 'Fun dream':
                return '../icons/make_record/dream_mood/fun_dream.svg'
            case 'Sad dream':
                return '../icons/make_record/dream_mood/sad_dream.svg'
            case 'Terrible':
                return '../icons/make_record/dream_mood/terrible.svg'
            case 'Made me think':
                return '../icons/make_record/dream_mood/made_me_think.svg'
            default:
                console.log('No such option in select dream category')
        }
    }
}