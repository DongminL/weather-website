import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import FORECAST_QUERY from "../queries/forecastQuery";
import { timestampToDate } from "@/utils/dateUtils";
import { Cities } from "../dtos/city";

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

    const forecastData = groupByDate(
        data.forecast.hourlyWeatherList, 
        cityName
    );
    const fiveDays = Object.keys(forecastData)?.slice(0, 5);

    return (
        <>
            {fiveDays.map((date, index) => (
                <div key={index}>
                    <details>
                        <summary>{date}</summary>
                        <ul>
                            {forecastData[date]?.map((data, index) => (
                                <li key={index}>
                                    <div>
                                        <img src={`https://openweathermap.org/img/wn/${data.weather.iconCode}@2x.png`} />
                                        <span>
                                            {timestampToDate(
                                                data.utcTimestamp, 
                                                Cities.fromValue(cityName).timezone, 
                                                "hh:mma")}
                                        </span>
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