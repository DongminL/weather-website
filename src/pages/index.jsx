import { useRouter } from "next/router";

export default function Main() {
    const router = useRouter();
    const cities = ["Seoul", "Tokyo", "Paris", "London"];

    return (
        <>
            <header>
                <h1>
                    <p>Welcome to</p>
                    <p>Weather App!</p>
                </h1>
            </header>
            <nav>
                <p>
                    Choose a city from the list below to check the weather.
                </p>
                {cities.map((city) => (
                    <button
                        key={city}
                        onClick={() => router.push(`/${city}`)}
                    >
                        {city}
                    </button>
                ))}
            </nav>

            <figure>
                <img src="/images/earth.svg"/>
            </figure>
        </>
    );
}