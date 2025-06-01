import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Cities } from "../dtos/city";
import CurrentCityWeather from "./current";
import WeatherProvider from "../services/weatherProvider";

export default function CityWeatherDetail() {
    const router = useRouter();
    const cityName = router.query.city;
    const [hourlyWeather, setHourlyWeather] = useState(null);

    useEffect(() => {
        if (!cityName) {
            return;
        }
        
        const fetchWeather = async () => {
            console.info(cityName)
            const city = Cities.fromValue(cityName);

            try {
                const weather = await new WeatherProvider().getFiveDaysForecastByCity(city);
                setHourlyWeather(weather);
            } catch (err) {
                console.error("시간 당 날씨 정보를 가져오는 중 오류 발생:", err);
            }
        };

        fetchWeather();
    }, [router.isReady, router.query.city]);

    return (
        <Fragment>
            <header>
                <img src="/earth.svg" />
                <h1>
                    Weather Information for {cityName}
                </h1>
            </header>

            <CurrentCityWeather cityName={cityName} population={hourlyWeather?.city?.population} />

            <section>
                <div>
                    <p>5-day Forecast</p>
                </div>

                {[23, 24, 25, 26, 27].map((day, index) => (
                    <div key={index}>
                        <details>
                            <summary>May {day}</summary>
                            <ul>
                                {hourlyWeather?.hourlyWeatherList?.map((data, index) => (
                                    <li key={index}>
                                        <div>
                                            <img src={`https://openweathermap.org/img/wn/${data.info.icon}@2x.png`} />
                                            <span>{data.utcTimestamp}</span>
                                        </div>
                                        <div>
                                            <p>{data.info.description}</p>
                                            <p>{data.weather.minTemp} / {data.weather.maxTemp}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                ))}
            </section>
        </Fragment>
    );
}
