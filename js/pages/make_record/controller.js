/**
 * make_record page controller module.
 * @module js/pages/make_record/controller
 */
export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
        this._initTagsInputListener();
        this._initDreamCategoryListener();
        this._initDreamMoodListener();
        this._initFormListener();
    }

    /**
    Initialize translation based on the selected language stored in local storage. */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
    Initialize event listener for burger button click. */
    _initBurgerButtonListener() {
        document.querySelector('.body').addEventListener('click', (event) => {
            if (event.target.id === 'burger-button' || event.target.parentNode.id === 'burger-button') {
                document.querySelector('#burger-content').classList.remove('not-exist');
            }
            else if (!event.target.closest('.burger-content-wrapper')) {
                document.querySelector('#burger-content').classList.add('not-exist');
            }
        });
    }

    /**
    Initializes the listener for the tags input field.
    Adds a tag when the user presses Enter or comma, and removes a tag when the user clicks on a tag.
    */
    _initTagsInputListener() {
        $('#tags-input').on('keyup', function (event) {
            if (event.key === 'Enter' || event.key === ',') {
                var tag = $(this).val().trim().replace(/,+$/, '');
                if (tag) {
                    $('#record-form-tags-container').append('<span class="badge badge-primary mr-1">' + tag + ' <button class="close" type="button" aria-label="Close"><span aria-hidden="true">&times;</span></button></span>');
                }
                $(this).val('');
                if (document.querySelectorAll('.badge').length > 4) {
                    $('#tags-input').prop('disabled', true);
                }
            }
        });

        $('#record-form-tags-container').on('click', '.badge', function () {
            $(this).remove();
            $('#tags-input').prop('disabled', false);
        });
    }

    /**
    Initializes the event listener for the dream category select element.
    When the select element value changes, this function updates the dream category icon element accordingly.
    */
    _initDreamCategoryListener() {
        const dreamCategorySelect = this.view.getDreamCategorySelectElement(),
            dreamCategoryIcon = this.view.getDreamCategoryIconElement();

        dreamCategorySelect.addEventListener("change", (event) => {
            switch (event.target.value) {
                case 'Usual':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/usual.svg'
                    break;
                case 'Just talking':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/just_talking.svg'
                    break;
                case 'Nightmare':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/nightmare.svg'
                    break;
                case 'Action':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/action.svg'
                    break;
                case 'Trash':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/trash.svg'
                    break;
                case 'Conscious dream':
                    dreamCategoryIcon.src = '../icons/make_record/dream_category/conscious_dream.svg'
                    break;
                default:
                    console.log('No such option in select dream category')
            }
        });
    }

    /**
    Initializes the event listener for the dream mood select element.
    When the select element value changes, this function updates the dream mood icon element accordingly.
    */
    _initDreamMoodListener() {
        const dreamMoodSelect = this.view.getDreamMoodSelectElement(),
            dreamMoodIcon = this.view.getDreamMoodIconElement();

        dreamMoodSelect.addEventListener("change", (event) => {
            switch (event.target.value) {
                case 'Typical dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/typical_dream.svg'
                    break;
                case 'Fun dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/fun_dream.svg'
                    break;
                case 'Sad dream':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/sad_dream.svg'
                    break;
                case 'Terrible':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/terrible.svg'
                    break;
                case 'Made me think':
                    dreamMoodIcon.src = '../icons/make_record/dream_mood/made_me_think.svg'
                    break;
                default:
                    console.log('No such option in select dream category')
            }
        });
    }

    /**
    Initializes the form submit event listener
    Prevents form submission
    Clears any wrong input classes from form elements
    Extracts form data using FormData and converts it to an object
    Extracts dream tags from badges on form and adds them to formInfo
    Validates form data using _isFormValidationOkay method
    Retrieves email from decoded JWT token and adds it to formInfo
    Publishes dream record using _publishDreamRecord method */
    _initFormListener() {
        const form = this.view.getRecordFormElement();

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            this.view.clearClassWrongInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const formData = new FormData(form);
            const formInfo = Object.fromEntries(formData);

            formInfo.dreamTags = [];
            document.querySelectorAll('.badge').forEach(tagSpan => {
                formInfo.dreamTags.push(tagSpan.innerText.replace(" ×", ""));
            })

            if (!this._isFormValidationOkay(formInfo)) {
                return;
            }

            const jwt = require('jsonwebtoken');
            const decoedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));

            formInfo.email = decoedJwt.email;

            const currentDate = new Date();
            formInfo.date = {};
            formInfo.date.dayNumber = currentDate.getDate();
            formInfo.date.monthNumber = currentDate.getMonth();
            formInfo.date.year = currentDate.getFullYear();
            formInfo.date.weekNumber = currentDate.getDay();
            formInfo.views = 0;
            formInfo.likes = 0;
            formInfo.likesUsersEmails = [];

            this._publishDreamRecord(formInfo);

        });
    }

    /**
    Validates the form input for dream title and plot.
    @param {Object} formInfo - Information from the form input.
    @returns {boolean} - Indicates whether the form validation is okay or not. */
    _isFormValidationOkay(formInfo) {
        const recordTitle = this.view.getRecordTitleInputElement(),
            recordPlot = this.view.getRecordPlotInputElement();

        let isValidationOkay = true;

        if (!this.model.isTitleOkay(formInfo.dreamTitle)) {
            this.view.addClassWrongInput(recordTitle);
            if (localStorage.getItem('language') === 'ru') {
                this.view.createWrongSpanElement(recordTitle, "Название сна не может быть пустым");
            } else {
                this.view.createWrongSpanElement(recordTitle, "Dream title can't be empty");
            }
            isValidationOkay = false;
        }
        if (!this.model.isPlotOkay(formInfo.dreamPlot)) {
            this.view.addClassWrongInput(recordPlot);
            if (localStorage.getItem('language') === 'ru') {
                this.view.createWrongSpanElement(recordPlot, "Описание сна должно состоять хотя бы из 10 символов");
            } else {
                this.view.createWrongSpanElement(recordPlot, "Dream description must have at least 10 symbols");
            }
            isValidationOkay = false;
        }

        return isValidationOkay;
    }

    /**
    Sends the form input to the model to register a new dream record.
    @param {Object} formInfo - Information from the form input. */
    _publishDreamRecord(formInfo) {
        const submitButton = this.view.getSubmitInputElement();

        this.model.registerNewRecord(JSON.stringify(formInfo))
            .then((response) => {
                if (!response.ok) {
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(submitButton, "Проблемы с соединением");
                    } else {
                        this.view.createWrongSpanElement(submitButton, "Network response was not ok");
                    }
                }
                return true;
            })
            .then((response) => {
                window.location.href = "./registered_home.html";
            })
            .catch((error) => {
                if (localStorage.getItem('language') === 'ru') {
                    this.view.createWrongSpanElement(submitButton, `Что-то пошло не так... ${error}`);
                } else {
                    this.view.createWrongSpanElement(submitButton, `Something go wrong... ${error}`);
                }
            });
    }
}