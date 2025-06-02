import { useRouter } from "next/router";
import CityWeatherDetail from "../features/weather/components/detail";
import CurrentCityWeather from "@/features/weather/components/current";

export default function CityWeatherPage() {
    const router = useRouter();
    const cityName = router.query.city;

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

                <CityWeatherDetail cityName={cityName} />
            </section>
        </>
    );
}
