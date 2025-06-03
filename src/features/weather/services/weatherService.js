import { CurrentWeatherResponse, ForecastResponse } from "../dtos/weatherResponse";
import { Cities } from "../dtos/city";
import { nowUtcTimestamp } from "@/utils/dateUtils";

const currentWeatherCache = new Map();
const forecastCache = new Map();
const TTL_MS = 5 * 60 * 1000; // 5분

export default class WeatherService {
    constructor(weatherProvider) {
        this.weatherProvider = weatherProvider;
    }

    async getCurrentWeatherByCityName(cityName) {
        const cityCoordinate = Cities.fromValue(cityName);

        const cached = currentWeatherCache.get(cityCoordinate);
        const now = nowUtcTimestamp();

        if (cached && now - cached.createdAt < TTL_MS) {
            return cached.data;
        }
        
        const currentWeather = new CurrentWeatherResponse(
            await this.weatherProvider.getCurrentWeatherByCity(cityCoordinate)
        );

        currentWeatherCache.set(cityCoordinate, {
            createdAt: now,
            data: currentWeather,
        });

        return currentWeather;
    }

    async getForecastByCityName(cityName) {
        const cityCoordinate = Cities.fromValue(cityName);

        const cached = forecastCache.get(cityCoordinate);
        const now = nowUtcTimestamp();

        if (cached && now - cached.createdAt < TTL_MS) {
            return cached.data;
        }
        
        const forecast = new ForecastResponse(
            await this.weatherProvider.getForecastByCity(cityCoordinate)
        );

        forecastCache.set(cityCoordinate, {
            createdAt: now,
            data: forecast,
        });

        return forecast;
    }
}