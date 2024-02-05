export default class View {

    static ID = {
        RECORD_FORM: {
            FORM: 'record-form',
            DREAM_CATEGORY_SELECT: 'dream-category-select',
            DREAM_CATEGORY_ICON: 'dream-category-icon',
            DREAM_MOOD_SELECT: 'dream-mood-select',
            DREAM_MOOD_ICON: 'dream-mood-icon',
            RECORD_TITLE: 'record-form-title',
            RECORD_PLOT: 'record-form-plot',
            SUBMIT_INPUT: 'record-form-submit',
        },
    }

    static JS_CLASSES = {
        REGISTER_FORM: {
            WRONG_INPUT: 'wrong-input',
            WRONG_SPAN: 'wrong-span',
        },
    }

    getDreamCategorySelectElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_CATEGORY_SELECT}`);
    }

    getDreamCategoryIconElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_CATEGORY_ICON}`);
    }

    getDreamMoodSelectElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_MOOD_SELECT}`);
    }

    getDreamMoodIconElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.DREAM_MOOD_ICON}`);
    }

    getRecordFormElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.FORM}`);
    }

    getRecordTitleInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.RECORD_TITLE}`);
    }

    getRecordPlotInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.RECORD_PLOT}`);
    }

    getSubmitInputElement() {
        return document.querySelector(`#${View.ID.RECORD_FORM.SUBMIT_INPUT}`);
    }

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
    }

    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    clearClassWrongInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.REGISTER_FORM.WRONG_INPUT);
        });
    }

    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.REGISTER_FORM.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }
}