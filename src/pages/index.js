import { useEffect, useState } from 'react'
import { useRouter } from "next/router";

export default function Main() {
    const router = useRouter();
    const cities = ["Seoul", "Tokyo", "Paris", "London"];

    return (
        <main>
            <div>
                <header>
                    <h1>
                        Welcome to <span>Weather App!</span>
                    </h1>
                    <p>
                        Choose a city from the list below to check the weather.
                    </p>
                </header>

                <nav>
                    {cities.map((city) => (
                        <button
                            onClick={() => router.push(`/${city}`)}
                        >
                            {city}
                        </button>
                    ))}
                </nav>

                <figure>
                    <img src="/earth.svg"/>
                </figure>
            </div>
        </main>
    );
}