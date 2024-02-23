export default class Model {

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

    getPromiseGetUserByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    getPromiseGetUserByNickname(nickanme) {
        return fetch(`http://localhost:3000/users?nickname=${nickanme}`)
    }

    getPromisegetDreamRecords() {
        return fetch(`http://localhost:3000/records`)
    }

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