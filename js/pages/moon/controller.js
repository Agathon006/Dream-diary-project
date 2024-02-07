export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initGetCurrentPosition()
    }

    _initGetCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const forecastContainer = this.view.getForecastContainerElement(),
                        forecastPlace = this.view.getForecastPlaceElement();

                    forecastPlace.innerText = `Place: ${data.city.name}`;

                    let firstNewDayWeatherIndex = 0;

                    for (let threeHoursForecast of data.list) {
                        if (threeHoursForecast.dt_txt.includes('00:00:00')) {
                            console.log(threeHoursForecast.dt_txt);
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
                })
                .catch(error => {
                    // Handle any errors
                });
        }
        );
    }
}