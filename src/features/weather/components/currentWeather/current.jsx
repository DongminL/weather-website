import styles from "./styles/CurrentCityWeather.module.css";
import { useQuery } from "@apollo/client";
import CURRENT_WEATHER_QUERY from "./queries/currentWeatherQuery";
import { timestampToDate } from "@/utils/dateUtils";
import { Cities } from "@/features/weather/dtos/city";
import Image from "next/image";

export default function CurrentCityWeather({ cityName }) {
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
    const currentDate = timestampToDate(
        weatherData.utcTimestamp, 
        Cities.fromValue(cityName).timezone, 
        "MMM DD. hh:mma"
    );

    return (
        <section className={styles.weatherBox}>
                <div className={styles.leftBlock}>
                    <Image
                        src={`https://openweathermap.org/img/wn/${weatherData.weather.iconCode}@2x.png`} 
                        alt="Weather State Icon"
                        className={styles.weatherIcon}
                        width={80}
                        height={80}
                    />
                    <div>
                        <p className={styles.date}>
                            {currentDate}
                        </p>
                        <div className={styles.cityInfo}>
                            <p className={styles.cityName}>
                                {cityName}, {weatherData.location.country}
                            </p>
                            <p className={styles.population}>
                                (인구수: {cityData.population})
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <p className={styles.temp}>
                        {weatherData.weather.temp}°C
                    </p>
                    <p className={styles.etcWeather}>
                        Feels like {weatherData.weather.feelsLike}°C&nbsp;
                        {weatherData.weather.description}&nbsp;
                        풍속 {weatherData.wind.speed}m/s&nbsp;
                        습도 {weatherData.weather.humidity}%
                    </p>
                </div>
        </section>
    );
}