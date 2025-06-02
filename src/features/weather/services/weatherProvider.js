export default class WeatherProvider {
    constructor() {
        this.weatherApiBaseUrl = process.env.OPEN_WEATHER_MAP_BASE_URL;
        this.apiKey = process.env.OPEN_WEATHER_API_KEY;
    }

    async getCurrentWeatherByCity(city) {
        return fetch(this.makeUrl("/weather", city.lat, city.lon))
            .then(response => response.json())
            .catch(error => {
                console.error("현재 날씨 정보를 가져오는 중 오류 발생:", error);
                throw new Error(error);
            });
    }

    // 3시간 간격으로 5일 동안에 날씨 예보 가져오기
    async getForecastByCity(city) {
        return fetch(this.makeUrl("/forecast", city.lat, city.lon))
            .then(response => response.json())
            .catch(error => {
                console.error("3시간 당 날씨 정보를 가져오는 중 오류 발생:", error);
                throw new Error(error);
            });
    }

    makeUrl(apiUrl, lat, lon) {
        const url = new URL(this.weatherApiBaseUrl + apiUrl);
        url.search = new URLSearchParams({
            appid: this.apiKey,
            units: "metric",
            lat: lat,
            lon: lon
        })

        return url.toString();
    }
}