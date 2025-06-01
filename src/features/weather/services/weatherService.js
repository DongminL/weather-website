import { CurrentWeatherResponse, ForecastResponse } from "../dtos/weatherResponse";
import { Cities } from "../dtos/city";

export default class WeatherService {
    constructor(weatherProvider) {
        this.weatherProvider = weatherProvider;
    }

    async getCurrentWeatherByCityName(cityName) {
        const cityCoordinate = Cities.fromValue(cityName);
        
        let currentWeather = await this.weatherProvider.getCurrentWeatherByCity(cityCoordinate);

        return currentWeather;
    }

    async getForecastByCityName(cityName) {
        const cityCoordinate = Cities.fromValue(cityName);
        
        let forecast = await this.weatherProvider.getForecastByCity(cityCoordinate);

        return forecast;
    }
}