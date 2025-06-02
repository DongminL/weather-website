import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CurrentCityWeather from "./current";
import { useQuery } from "@apollo/client";
import FORECAST_QUERY from "../queries/forecastQuery";

export default function CityWeatherDetail() {
    const router = useRouter();
    const cityName = router.query.city;
    
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
            <header>
                <img src="/earth.svg" />
                <h1>
                    Weather Information for {cityName}
                </h1>
            </header>

            <CurrentCityWeather cityName={cityName} />

            <section>
                <div>
                    <p>5-day Forecast</p>
                </div>

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
            </section>
        </>
    );
}
