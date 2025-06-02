import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import FORECAST_QUERY from "../queries/forecastQuery";

export default function CityWeatherDetail({ cityName }) {
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

    const forecastData = data.forecast;

    return (
        <>
            {[23, 24, 25, 26, 27].map((day, index) => (
                <div key={index}>
                    <details>
                        <summary>May {day}</summary>
                        <ul>
                            {forecastData.hourlyWeatherList?.map((data, index) => (
                                <li key={index}>
                                    <div>
                                        <img src={`https://openweathermap.org/img/wn/${data.weather.iconCode}@2x.png`} />
                                        <span>{data.utcTimestamp}</span>
                                    </div>
                                    <div>
                                        <p>{data.weather.description}</p>
                                        <p>{data.weather.minTemp} / {data.weather.maxTemp}</p>
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
