/**
 * moon page model module.
 * @module js/pages/moon/model
 */
export default class Model {

    /**
    Retrieves the weather forecast for Minsk from OpenWeatherMap API.
    @returns {Promise<Response>} A promise that resolves with the weather forecast data for Minsk. */
    getWeatherForecastMinsk() {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);
    }

    /**
    Retrieves the weather forecast for the specified location using the latitude and longitude.
    @param {number} latitude The latitude of the location.
    @param {number} longitude The longitude of the location.
    @returns {Promise<Response>} A promise that resolves with the weather forecast data for the specified location. */
    getWeatherForecastForCurrentLocation(latitude, longitude) {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`)
    }

}