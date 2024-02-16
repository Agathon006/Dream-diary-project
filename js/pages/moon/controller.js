import { Date } from "core-js";

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initMyPlaceButton()
        this._initCurrentForecast()
        this._initMoonphases()
        this._initCurrentMoonPhaseBorder()
    }

    _initMyPlaceButton() {

        const myPlaceButton = this.view.getMyPlaceButtonElement();

        myPlaceButton.addEventListener('click', () => {
            this.view.toggleClassesWaitingBackgroundOfForecastDayElements();

            navigator.geolocation.getCurrentPosition((position) => {
                this.model.getWeatherForecastForCurrentLocation(position.coords.latitude, position.coords.longitude)
                    .then(response => response.json())
                    .then(data => {
                        this.view.toggleClassHidden(myPlaceButton);

                        const forecastContainer = this.view.getForecastContainerElement(),
                            forecastPlace = this.view.getForecastPlaceElement();

                        forecastPlace.innerText = `Place: ${data.city.name}`;

                        let firstNewDayWeatherIndex = 0;

                        for (let threeHoursForecast of data.list) {
                            if (threeHoursForecast.dt_txt.includes('00:00:00')) {
                                break;
                            }
                            firstNewDayWeatherIndex++;
                        }

                        for (let i = 0; i < 5; i++) {
                            let j = i * 8 + firstNewDayWeatherIndex;
                            forecastContainer.children[i].children[0].innerText = data.list[j].dt_txt;
                            forecastContainer.children[i].children[1].src = `./../icons/moon/${data.list[j].weather[0].icon}.png`;
                            forecastContainer.children[i].children[2].innerText = data.list[j].weather[0].main;
                            forecastContainer.children[i].children[3].children[1].innerText = `${data.list[j].clouds.all}%`;
                            this.view.whichColorForCloudCover(forecastContainer.children[i].children[3].children[1], data.list[j].clouds.all, forecastContainer.children[i].children[4]);
                        };
                        this.view.toggleClassesWaitingBackgroundOfForecastDayElements();
                    })
                    .catch(error => {
                        console.log('Error getting data from weather API: ', error)
                    });
            });
        });
    }

    _initCurrentForecast() {

        this.model.getWeatherForecastMinsk()
            .then(response => response.json())
            .then(data => {
                const forecastContainer = this.view.getForecastContainerElement(),
                    forecastPlace = this.view.getForecastPlaceElement();

                forecastPlace.innerText = `Place: ${data.city.name}`;

                let firstNewDayWeatherIndex = 0;

                for (let threeHoursForecast of data.list) {
                    if (threeHoursForecast.dt_txt.includes('00:00:00')) {
                        break;
                    }
                    firstNewDayWeatherIndex++;
                }

                for (let i = 0; i < 5; i++) {
                    let j = i * 8 + firstNewDayWeatherIndex;
                    forecastContainer.children[i].children[0].innerText = data.list[j].dt_txt;
                    forecastContainer.children[i].children[1].src = `./../icons/moon/${data.list[j].weather[0].icon}.png`;
                    forecastContainer.children[i].children[2].innerText = data.list[j].weather[0].main;
                    forecastContainer.children[i].children[3].children[1].innerText = `${data.list[j].clouds.all}%`;
                    this.view.whichColorForCloudCover(forecastContainer.children[i].children[3].children[1], data.list[j].clouds.all, forecastContainer.children[i].children[4]);
                };
                this.view.toggleClassesWaitingBackgroundOfForecastDayElements();
            })
            .catch(error => {
                console.log('Error getting data from weather API: ', error)
            });
    }

    _initMoonphases() {
        const newMoonDate = this.view.getNewMoonDateSpanElement(),
            growingMoonDate = this.view.getGrowingMoonDateSpanElement(),
            fullMoonDate = this.view.getFullMoonDateSpanElement(),
            waningMoonDate = this.view.getWaningDateSpanElement(),
            nextNewMoonDate = this.view.getNextNewMoonDateSpanElement(),
            nextGrowingMoonDate = this.view.getNextGrowingMoonDateSpanElement(),
            nextFullMoonDate = this.view.getNextFullMoonDateSpanElement(),
            nextWaningMoonDate = this.view.getNextWaningDateSpanElement();

        newMoonDate.innerText = this._calculateMoonPhase(0);
        fullMoonDate.innerText = this._calculateMoonPhase(0.5);
        growingMoonDate.innerText = `${this._changeOneDay(newMoonDate.innerText, 'increase')} - ${this._changeOneDay(fullMoonDate.innerText, 'reduce')}`
        waningMoonDate.innerText = `${this._changeOneDay(fullMoonDate.innerText, 'increase')} - ${this._calculateMoonPhase(1)}`

        nextNewMoonDate.innerText = this._calculateMoonPhase(0, true);
        nextFullMoonDate.innerText = this._calculateMoonPhase(0.5, true);
        nextGrowingMoonDate.innerText = `${this._changeOneDay(nextNewMoonDate.innerText, 'increase')} - ${this._changeOneDay(nextFullMoonDate.innerText, 'reduce')}`
        nextWaningMoonDate.innerText = `${this._changeOneDay(nextFullMoonDate.innerText, 'increase')} - ${this._calculateMoonPhase(1, true)}`
    }

    _calculateMoonPhase(phaseRatio, next = false) {
        const synodicMonth = 29.53058867,
            newMoonDateLandmark = new Date('January 11, 2024 14:57:00'),
            currentDate = new Date();

        const daysSinceNewMoon = ((currentDate - newMoonDateLandmark) / (24 * 60 * 60 * 1000)) % synodicMonth,
            phaseDays = phaseRatio * synodicMonth;

        const daysToNextPhase = (synodicMonth - daysSinceNewMoon) + phaseDays,
            nextPhaseDate = new Date(currentDate);

        if (next) {
            nextPhaseDate.setDate(currentDate.getDate() + daysToNextPhase);
        } else {
            nextPhaseDate.setDate(currentDate.getDate() + daysToNextPhase - synodicMonth);
        }

        return this._handleDateToCommon(nextPhaseDate);
    }

    _changeOneDay(dateString, action) {
        const parts = dateString.split('.');

        const day = parseInt(parts[0], 10),
            month = parseInt(parts[1], 10) - 1,
            year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);

        if (action === 'increase') {
            date.setDate(date.getDate() + 1);
        } else if (action === 'reduce') {
            date.setDate(date.getDate() - 1);
        }

        const nextDate = this._handleDateToCommon(date);

        return nextDate;
    }

    _initCurrentMoonPhaseBorder() {

        const targetDate = this._handleDateToCommon(new Date());

        const spans = this.view.getCurrentMoonPhaseDateSpansElements();

        spans.forEach(span => {
            const dates = span.innerText.split(' - ');

            if (dates.length === 2) {
                const startDate = new Date(this._handleDateToValid(dates[0])),
                    endDate = new Date(this._handleDateToValid(dates[1])),
                    targetDateObj = new Date(this._handleDateToValid(targetDate));

                if (targetDateObj >= startDate && targetDateObj <= endDate) {
                    span.style.fontWeight = '900';
                    span.parentElement.style.border = '2px solid black'
                }
            } else {
                if (targetDate === dates[0]) {
                    span.style.fontWeight = '900';
                    span.parentElement.style.border = '2px solid black'
                }
            }
        });
    }

    _handleDateToCommon(date) {
        const day = date.getDate().toString().padStart(2, '0'),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    _handleDateToValid(date) {
        const parts = date.split('.');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedDate;
    }
}