import { error } from 'jquery';

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTagsInputListener();
        this._initDreamCategoryListener();
        this._initDreamMoodListener();
        this._initFormListener();
    }

    _initTagsInputListener() {
        $('#record-form-tags-input').on('keyup', function (event) {
            if (event.key === 'Enter' || event.key === ',') {
                var tag = $(this).val().trim().replace(/,+$/, '');
                if (tag) {
                    $('#record-form-tags-container').append('<span class="badge badge-primary mr-1">' + tag + ' <button class="close" type="button" aria-label="Close"><span aria-hidden="true">&times;</span></button></span>');
                }
                $(this).val('');
                console.log(document.querySelectorAll('.badge').length)
                if (document.querySelectorAll('.badge').length > 4) {
                    $('#record-form-tags-input').prop('disabled', true);
                }
            }
        });

        $('#record-form-tags-container').on('click', '.badge', function () {
            $(this).remove();
            $('#record-form-tags-input').prop('disabled', false);
        });
    }

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

            this._publishDreamRecord(formInfo);

        });
    }

    _isFormValidationOkay(formInfo) {
        const recordTitle = this.view.getRecordTitleInputElement(),
            recordPlot = this.view.getRecordPlotInputElement();

        let isValidationOkay = true;

        if (!this.model.isTitleOkay(formInfo.dreamTitle)) {
            this.view.addClassWrongInput(recordTitle);
            this.view.createWrongSpanElement(recordTitle, "Dream title can't be empty");
            isValidationOkay = false;
        }
        if (!this.model.isPlotOkay(formInfo.dreamPlot)) {
            this.view.addClassWrongInput(recordPlot);
            this.view.createWrongSpanElement(recordPlot, "Dream description must have at least 10 symbols");
            isValidationOkay = false;
        }

        return isValidationOkay;
    }

    _publishDreamRecord(formInfo) {
        const submitButton = this.view.getSubmitInputElement();

        this.model.registerNewRecord(JSON.stringify(formInfo))
            .then((response) => {
                if (!response.ok) {
                    this.view.createWrongSpanElement(submitButton, "Network response was not ok");
                }
                return true;
            })
            .then((response) => {
                console.log('Success')
                window.location.href = "./registered_home.html";
            })
            .catch((error) => {
                this.view.createWrongSpanElement(submitButton, `Something go wrong... ${error}`);
            });
    }
}