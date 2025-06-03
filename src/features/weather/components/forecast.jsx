import styles from "./styles/CityWeatherForecast.module.css";
import { useQuery } from "@apollo/client";
import FORECAST_QUERY from "../queries/forecastQuery";
import { timestampToDate } from "@/utils/dateUtils";
import { Cities } from "../dtos/city";
import Image from "next/image";

export default function CityWeatherForecast({ cityName }) {
    const { loading, error, data } = useQuery(FORECAST_QUERY, {
        variables: { cityName },
        context: { clientName: "local" },
    });

    if (loading) {
        return <p>현재 날씨 데이터를 불러오는 중...</p>;
    }
    if (error) {
        return <p>에러 발생: {error.message}</p>;
    }

    const forecastData = groupByDate(
        data.forecast.hourlyWeatherList, 
        cityName
    );
    const fiveDays = Object.keys(forecastData)?.slice(0, 5);

    return (
        <>
            {fiveDays.map((date, index) => (
                
                <div key={index} className={styles.dateBox}>
                    <details className={styles.detailBox}>
                        <summary className={styles.summary}>
                            {date}
                            <Image
                                src="/images/toggle.svg"
                                alt="Weather State Icon"
                                className={styles.toggleIcon}
                                width={20}
                                height={20}
                            />
                        </summary>
                        <ul className={styles.hourList}>

                            {forecastData[date]?.map((data, index) => (

                                <li key={index} className={styles.hourItem}>
                                    <div className={styles.leftBlock}>
                                        <Image 
                                            src={`https://openweathermap.org/img/wn/${data.weather.iconCode}@2x.png`} 
                                            className={styles.weatherIcon}
                                            width={60}
                                            height={60}
                                        />
                                        <span className={styles.time}>
                                            {timestampToDate(
                                                data.utcTimestamp, 
                                                Cities.fromValue(cityName).timezone, 
                                                "HH:mma")}
                                        </span>
                                    </div>
                                    <div className={styles.rightBlock}>
                                        <p className={styles.description}>
                                            {data.weather.description}
                                        </p>
                                        <p className={styles.temp}>
                                            {data.weather.minTemp} / {data.weather.maxTemp}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
            ))}
        </>
    );
}

function groupByDate(hourlyWeatherList, cityName) {
    return hourlyWeatherList.reduce((acc, data) => {
        const date = timestampToDate(
            data.utcTimestamp, 
            Cities.fromValue(cityName).timezone, 
            "MMM DD"
        );

        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(data);

        return acc;
    }, {})
}