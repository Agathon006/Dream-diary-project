export default class Model {

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

    getPromiseGetDreamRecords(id) {
            return fetch(`http://localhost:3000/records/${id}`)
    }

    getPromiseGetUserByEmail(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
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
}