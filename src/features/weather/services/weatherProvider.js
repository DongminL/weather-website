import { CurrentWeatherResponse, ForecastResponse } from "../dtos/weatherResponse";

export default class WeatherProvider {
    constructor() {
        this.currentWeatherUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_CURRENT_URL;
        this.forecastUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_FORECAST_URL;
        this.apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
    }

    async getCurrentWeatherByCity(city) {
        const response = await fetch(`${this.currentWeatherUrl}?appid=${this.apiKey}&units=metric&lat=${city.lat}&lon=${city.lon}`);
        const data = await response.json();
        return new CurrentWeatherResponse(data);
    }

    async getFiveDaysForecastByCity(city) {
        const response = await fetch(`${this.forecastUrl}?appid=${this.apiKey}&units=metric&lat=${city.lat}&lon=${city.lon}`);
        const data = await response.json();
        return new ForecastResponse(data);
    }
}