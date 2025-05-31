import { Fragment } from "react";
import { useRouter } from "next/router";
import CurrentCityWeather from "./current";

export default function CityWeatherDetail() {
    const router = useRouter();
    const { city } = router.query;

    const dummyInfo = Array.from({ length: 7 }, (_, i) => ({
        time : `${(i * 3).toString().padStart(2, '0')}:00`,
        minTemp : "297.32°C",
        maxTemp : "300.32°C",
        description : "clear sky",
        icon : "01d"
    }));

    return (
        <Fragment>
            <header>
                <img src="/earth.svg" />
                <h1>
                    Weather Information for {city}
                </h1>
            </header>

            <CurrentCityWeather cityName={city} />

            <section>
                <div>
                    <p>5-day Forecast</p>
                </div>

                {[23, 24, 25, 26, 27].map((day, index) => (
                    <div key={index}>
                        <details>
                            <summary>May {day}</summary>
                            <ul>
                                {dummyInfo.map((info, index) => (
                                    <li key={index}>
                                        <div>
                                            <img src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`} />
                                            <span>{info.time}</span>
                                        </div>
                                        <div>
                                            <p>{info.description}</p>
                                            <p>{info.minTemp} / {info.maxTemp}</p>
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
