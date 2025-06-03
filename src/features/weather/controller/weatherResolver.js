import WeatherService from "../services/weatherService"
import WeatherProvider from "../services/weatherProvider"

const weatherService = new WeatherService(new WeatherProvider());

export const weatherResolver = {
    Query : {
        currentWeather: async (_, { cityName }) => {
            if (!cityName) {
                throw new Error("cityName is required");
            }

            return await weatherService.getCurrentWeatherByCityName(cityName);
        },
        forecast: async (_, { cityName }) => {
            if (!cityName) {
                throw new Error("cityName is required");
            }

            return await weatherService.getForecastByCityName(cityName);
        }
    }
}