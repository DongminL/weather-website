export default class WeatherProvider {
    constructor() {
        this.currentWeatherUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_CURRENT_URL;
        this.forecastUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_FORECAST_URL;
        this.apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
    }

    async getCurrentWeatherByCity(city) {
        return fetch(`${this.currentWeatherUrl}?appid=${this.apiKey}&units=metric&lat=${city.lat}&lon=${city.lon}`)
            .then(response => response.json())
            .catch(error => {
                console.error("현재 날씨 정보를 가져오는 중 오류 발생:", error);
                throw new Error(error);
            });
    }

    // 3시간 간격으로 5일 동안에 날씨 예보 가져오기
    async getForecastByCity(city) {
        return fetch(`${this.forecastUrl}?appid=${this.apiKey}&units=metric&lat=${city.lat}&lon=${city.lon}`)
            .then(response => response.json())
            .catch(error => {
                console.error("3시간 당 날씨 정보를 가져오는 중 오류 발생:", error);
                throw new Error(error);
            });
    }
}