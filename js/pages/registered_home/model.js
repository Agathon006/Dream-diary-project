/**
 * registered_home page model module.
 * @module js/pages/registered_home/model
 */
export default class Model {

    /**
    Fetches dream records based on specified parameters.
    @param {number} page - The page number to retrieve dream records from.
    @param {string} searchInput - The search input for filtering dream records.
    @param {string} category - The category of the dream records to filter by.
    @param {string} mood - The mood of the dream records to filter by.
    @param {string} sort - The sorting order for the dream records.
    @param {string} email - The email address associated with the dream records.
    @returns {Promise} - A Promise that resolves with the dream records fetched from the API. */
    getPromiseGetDreamRecords(page, searchInput, category, mood, sort, email) {
        if (sort !== 'Default') {
            if (searchInput != '' && category !== 'All' && mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&dreamMood=${mood}&email=${email}&_sort=-${sort}`)
            }

            if (searchInput != '' && category !== 'All' && mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&dreamMood=${mood}&_sort=-${sort}`)
            }
            if (searchInput != '' && category !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&email=${email}&_sort=-${sort}`)
            }
            if (searchInput != '' && mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamMood=${mood}&email=${email}&_sort=-${sort}`)
            }
            if (category !== 'All' && mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&dreamMood=${mood}&email=${email}&_sort=-${sort}`)
            }

            if (searchInput != '' && category !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&_sort=-${sort}`)
            }
            if (searchInput != '' && mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamMood=${mood}&_sort=-${sort}`)
            }
            if (searchInput != '' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&email=${email}&_sort=-${sort}`)
            }
            if (category !== 'All' && mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&dreamMood=${mood}&_sort=-${sort}`)
            }
            if (category !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&email=${email}&_sort=-${sort}`)
            }
            if (mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamMood=${mood}&email=${email}&_sort=-${sort}`)
            }

            if (searchInput != '') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&_sort=-${sort}`)
            }
            if (category !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&_sort=-${sort}`)
            }
            if (mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamMood=${mood}&_sort=-${sort}`)
            }
            if (email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&email=${email}&_sort=-${sort}`)
            }
            return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&_sort=-${sort}`)
        } else {
            if (searchInput != '' && category !== 'All' && mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&dreamMood=${mood}&email=${email}`)
            }

            if (searchInput != '' && category !== 'All' && mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&dreamMood=${mood}`)
            }
            if (searchInput != '' && category !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}&email=${email}`)
            }
            if (searchInput != '' && mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamMood=${mood}&email=${email}`)
            }
            if (category !== 'All' && mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&dreamMood=${mood}&email=${email}`)
            }

            if (searchInput != '' && category !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamCategory=${category}`)
            }
            if (searchInput != '' && mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&dreamMood=${mood}`)
            }
            if (searchInput != '' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}&email=${email}`)
            }
            if (category !== 'All' && mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&dreamMood=${mood}`)
            }
            if (category !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}&email=${email}`)
            }
            if (mood !== 'All' && email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamMood=${mood}&email=${email}`)
            }

            if (searchInput != '') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamTitle=${searchInput}`)
            }
            if (category !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamCategory=${category}`)
            }
            if (mood !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&dreamMood=${mood}`)
            }
            if (email !== 'All') {
                return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5&email=${email}`)
            }
            return fetch(`http://localhost:3000/records?_page=${page}&_per_page=5`)
        }
    }

    /**
    Fetches user by email from the API.
    @param {string} email - The email address of the user to fetch.
    @returns {Promise} - A Promise that resolves with the user data fetched from the API. */
    getPromiseGetUserByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    /**
    Fetches user by nickname from the API.
    @param {string} nickname - The nickname of the user to fetch.
    @returns {Promise} - A Promise that resolves with the user data fetched from the API. */
    getPromiseGetUserByNickname(nickanme) {
        return fetch(`http://localhost:3000/users?nickname=${nickanme}`)
    }

    /**
    Fetches all dream records from the API.
    @returns {Promise} - A Promise that resolves with the dream records fetched from the API. */
    getPromisegetDreamRecords() {
        return fetch(`http://localhost:3000/records`)
    }

    /**
    Returns the icon path based on the dream category name
    @param {string} categoryName - The name of the dream category
    @returns {string} - The path to the corresponding icon */
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
    @returns {string} - The path to the corresponding icon */
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

    /**
    Returns the name of the month based on the month number provided.
    @param {number} monthNumber - The month number (0-11).
    @returns {string} - The name of the month corresponding to the month number provided. */
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
    Returns the name of the week day based on the week day number provided.
    @param {number} weekNumber - The week day number (0-6).
    @returns {string} - The name of the week day corresponding to the week day number provided. */
    whichWeekDayNameByNumber(weekNumber) {

        switch (weekNumber) {
            case 0:
                return 'Sunday'
            case 1:
                return 'Monday'
            case 2:
                return 'Tuesday'
            case 3:
                return 'Wednesday'
            case 4:
                return 'Thursday'
            case 5:
                return 'Friday'
            case 6:
                return 'Saturday'
            default:
                console.log('No such week day')
        }
    }

}