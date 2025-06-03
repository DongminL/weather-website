import styles from "@/styles/Main.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

export default function Main() {
    const router = useRouter();
    const cities = ["Seoul", "Tokyo", "Paris", "London"];
    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <main className={styles.root}>
            <header>
                <h1 className={styles.title}>
                    <p className={styles.welcome}>
                        Welcome to
                    </p>
                    <p className={styles.app}>
                        Weather App!
                    </p>
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
                    ))}
                </div>
            </nav>

            <figure>
                <Image 
                    src="/images/earth.svg"
                    width={430}
                    height={321}
                />
            </figure>
        </main>
    );
}