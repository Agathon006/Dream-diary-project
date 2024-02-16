export default class View {

    static ID = {
        FORECAST: {
            PLACE: 'forecast-place',
            MY_PLACE_BUTTON: 'forecast-place-button',
            CONTAINER: 'forecast-container',
        },
        MOON_PHASES: {
            NEW_MOON_DATE: 'new-moon-date',
            GROWING_MOON_DATE: 'growing-moon-date',
            FULL_MOON_DATE: 'full-moon-date',
            WANING_MOON_DATE: 'waning-moon-date',
        },
        NEXT_MOON_PHASES: {
            NEXT_NEW_MOON_DATE: 'next-new-moon-date',
            NEXT_GROWING_MOON_DATE: 'next-growing-moon-date',
            NEXT_FULL_MOON_DATE: 'next-full-moon-date',
            NEXT_WANING_MOON_DATE: 'next-waning-moon-date',
        }
    }

    static JS_CLASSES = {
        MOON_PHASES: {
            DATES_SPANS: 'moon-phase__current-date-span',
        },
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

    getNewMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.NEW_MOON_DATE}`);
    }

    getGrowingMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.GROWING_MOON_DATE}`);
    }

    getFullMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.FULL_MOON_DATE}`);
    }

    getWaningDateSpanElement() {
        return document.querySelector(`#${View.ID.MOON_PHASES.WANING_MOON_DATE}`);
    }

    getNextNewMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_NEW_MOON_DATE}`);
    }

    getNextGrowingMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_GROWING_MOON_DATE}`);
    }

    getNextFullMoonDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_FULL_MOON_DATE}`);
    }

    getNextWaningDateSpanElement() {
        return document.querySelector(`#${View.ID.NEXT_MOON_PHASES.NEXT_WANING_MOON_DATE}`);
    }

    getCurrentMoonPhaseDateSpansElements() {
        return document.querySelectorAll(`.${View.JS_CLASSES.MOON_PHASES.DATES_SPANS}`);
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
        element.style.transition = 'none';
        element.classList.toggle(View.JS_CLASSES.COMMON.HIDDEN);
    }

    toggleClassesWaitingBackgroundOfForecastDayElements() {
        document.querySelectorAll('.forecast-day').forEach((element) => {
            element.classList.toggle('waiting-background');
        });
    }

}