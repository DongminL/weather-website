import styles from "@/styles/Main.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Main() {
    const router = useRouter();
    const cities = ["Seoul", "Tokyo", "Paris", "London"];
    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <>
            <Head>
                <title>Weather App</title>
                <meta name="description" content="Weather check app by city" />
                <meta property="og:title" content="Weather app" />
                <meta property="og:description" content="Choose a city to check the weather" />
                <meta property="og:type" content="website" />
            </Head>
            <main className={styles.root}>
                <header>
                    <h1 className={styles.title}>
                        <span className={styles.welcome}>
                            Welcome to
                        </span>
                        <br/>
                        <span className={styles.app}>
                            Weather App!
                        </span>
                    </h1>
                </header>

                <nav className={styles.nav}>
                    <p className={styles.description}>
                        Choose a city from the list below to check the weather.
                    </p>
                    <div className={styles.cityBtns}>
                        {cities.map((city) => (
                            <button
                                key={city}
                                className={`${styles.cityBtn} ${selectedCity === city ? styles.selected : ""}`}
                                onClick={() => {
                                    setSelectedCity(city);
                                    router.push(`/${city}`);
                                }}
                            >
                                {city}
                            </button>
                    )   )}
                    </div>
                </nav>

                <figure>
                    <Image 
                        src="/images/earth.png"
                        alt="Earth Icon"
                        width={430}
                        height={321}
                        priority
                    />
                </figure>
            </main>
        </>
    );
}