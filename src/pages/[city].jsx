import styles from "@/styles/CityWeatherPage.module.css"
import { useRouter } from "next/router";
import CityWeatherForecast from "../features/weather/components/forecast";
import CurrentCityWeather from "@/features/weather/components/current";
import Image from "next/image";

export default function CityWeatherPage() {
    const router = useRouter();
    const cityName = router.query.city;

    return (
        <main className={styles.root}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <Image 
                        src="/images/earth.svg" 
                        className={styles.earth} 
                        width={80}
                        height={80}
                        onClick={() => router.push("/")}
                    />
                    <h1 className={styles.title}>
                        Weather Information for {cityName}
                    </h1>
                </header>

                <CurrentCityWeather cityName={cityName} />

                <section className={styles.forecastSection}>
                    <header className={styles.forecastHeader}>
                        <p className={styles.forecastTitle}>5-day Forecast</p>
                    </header>

                    <CityWeatherForecast cityName={cityName} />
                </section>
            </div>
        </main>
    );
}
