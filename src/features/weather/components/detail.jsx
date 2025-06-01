import { useEffect, useState } from "react";
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
            const city = Cities.fromValue(cityName);

            const weather = await new WeatherProvider().getFiveDaysForecastByCity(city);
            setHourlyWeather(weather);
        };

        fetchWeather();
    }, [router.isReady, router.query.city]);

    return (
        <>
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
