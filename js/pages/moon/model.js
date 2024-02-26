/**
 * moon page model module.
 * @module js/pages/moon/model
 */
export default class Model {

    getWeatherForecastMinsk() {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);
    }

    getWeatherForecastForCurrentLocation(latitude, longitude) {
        return  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`)
    }

}