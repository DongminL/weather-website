import styles from "@/styles/CityWeatherPage.module.css"
import { useRouter } from "next/router";
import CityWeatherDetail from "../features/weather/components/detail";
import CurrentCityWeather from "@/features/weather/components/current";

export default function CityWeatherPage() {
    const router = useRouter();
    const cityName = router.query.city;

    return (
        <main className={styles.root}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <img src="/images/earth.svg" className={styles.earth} />
                    <h1 className={styles.title}>
                        Weather Information for {cityName}
                    </h1>
                </header>

                <CurrentCityWeather cityName={cityName} />

                <section className={styles.forecastSection}>
                    <header className={styles.forecastHeader}>
                        <p className={styles.forecastTitle}>5-day Forecast</p>
                    </header>

                    <CityWeatherDetail cityName={cityName} />
                </section>
            </div>
        </main>
    );
}
