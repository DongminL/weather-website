import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import CURRENT_WEATHER_QUERY from "../queries/currentWeatherQuery";

export default function CurrentCityWeather({ cityName}) {
    const { loading, error, data } = useQuery(CURRENT_WEATHER_QUERY, {
        variables: { cityName },
        context: { clientName: "local" },
    });

    if (loading) {
        return <p>현재 날씨 데이터를 불러오는 중...</p>;
    }
    if (error) {
        return <p>에러 발생: {error.message}</p>;
    }

    const weatherData = data.currentWeather;
    const cityData = data.forecast.city;

    return (
        <section>
            <div>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather.iconCode}@2x.png`} />
                <div>
                    <p>{new Date(weatherData.utcTimestamp * 1000).toLocaleString()}</p>
                    <h2>
                        {cityName}, {weatherData.location.country}
                    </h2>
                    <p>(인구수: {cityData.population})</p>
                </div>
                <div>
                    <p>{weatherData.weather.temp}°C</p>
                    <p>
                        Feels like {weatherData.weather.feelsLike}°C {weatherData.weather.description} 풍속 {weatherData.wind.speed}m/s 습도 {weatherData.weather.humidity}%
                    </p>
                </div>
            </div>
        </section>
    );
}