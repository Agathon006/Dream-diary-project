export default class View {

    static ID = {
        FORECAST: {
            PLACE: 'forecast-place',
            MY_PLACE_BUTTON: 'forecast-place-button',
            CONTAINER: 'forecast-container',
        },
    }

    static JS_CLASSES = {
        COMMON: {
            HIDDEN: 'hidden',
        },
    }

    getForecastPlaceElement() {
        return document.querySelector(`#${View.ID.FORECAST.PLACE}`);
    }

    getMyPlaceButtonElement() {
        return document.querySelector(`#${View.ID.FORECAST.MY_PLACE_BUTTON}`);
    }

    getForecastContainerElement() {
        return document.querySelector(`#${View.ID.FORECAST.CONTAINER}`);
    }

    whichColorForCloudCover(element, number, resultElement) {
        if (number > 67) {
            element.style.color = 'red';
            resultElement.style.color = 'red';
            resultElement.innerText = 'Unlikely';
        } else if (number > 33) {
            element.style.color = 'yellow';
            resultElement.style.color = 'yellow';
            resultElement.innerText = 'Perhaps';
        } else {
            element.style.color = 'green';
            resultElement.style.color = 'green';
            resultElement.innerText = 'Most likely';
        }
    }

    toggleClassHidden(element) {
        element.classList.toggle(View.JS_CLASSES.COMMON.HIDDEN);
    }

}