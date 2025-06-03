import styles from "@/styles/CityWeatherPage.module.css"
import { useRouter } from "next/router";
import CityWeatherForecast from "../features/weather/components/forecast";
import CurrentCityWeather from "@/features/weather/components/current";
import Image from "next/image";
import Head from "next/head";

export default function CityWeatherPage({ cityName }) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Weather in {cityName} | Weather App</title>
                <meta name="description" content={`Current weather and forecast for ${cityName}.`} />
                <meta property="og:title" content={`Weather in ${cityName}`} />
                <meta property="og:description" content={`Check the 5-day forecast and current weather for ${cityName}.`} />
                <meta property="og:type" content="website" />
            </Head>
            <main className={styles.root}>
                <div className={styles.wrapper}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            Weather Information for {cityName}
                        </h1>
                        <Image 
                            src="/images/earth.png" 
                            alt="Earth Icon"
                            className={styles.earth}
                            width={80}
                            height={70}
                            onClick={() => router.push("/")}
                        />
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
        </>
    );
}

export async function getServerSideProps(context) {
    const { city } = context.params;

    return {
        props: {
            cityName: city,
        }
    }
}