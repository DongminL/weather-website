import { useEffect, useState } from "react";
import WeatherProvider from "../services/weatherProvider";
import { Cities } from "../dtos/city";

export default function CurrentCityWeather({ cityName, population }) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const city = Cities.fromValue(cityName);

            const weather = await new WeatherProvider().getCurrentWeatherByCity(city);
            setWeatherData(weather);
        };

        fetchWeather();
    }, [cityName]);

    return (
        <section>
            {weatherData ? (
                <div>
                <img src={`https://openweathermap.org/img/wn/${weatherData.info.icon}@2x.png`} />
                <div>
                    <p>May 23. 03:00am</p>
                    <h2>
                        {cityName}, {weatherData.location.country}
                    </h2>
                    <p>
                        (인구수: {population})
                    </p>
                </div>
                <div>
                    <p>
                        {weatherData.weather.temp}°C
                    </p>
                    <p>
                        Feels like {weatherData.weather.feelsLike}°C {weatherData.info.description} 풍속 {weatherData.wind.speed}m/s 습도{weatherData.weather.humidity}%
                    </p>
                </div>
                </div>
            ) : (
                <p>현재 날씨 데이터를 불러오는 중...</p>
            )}
        </section>
    );
}
