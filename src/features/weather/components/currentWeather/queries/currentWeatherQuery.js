import { gql } from "@apollo/client";

const CURRENT_WEATHER_QUERY = gql`
    query GetCurrentWeather($cityName: String!) {
        currentWeather(cityName: $cityName) {
            utcTimestamp
            weather {
                temp
                feelsLike
                humidity
                description
                iconCode
            }
            wind {
                speed
            }
            location {
                country
            }
        },
        forecast(cityName: $cityName) {
            city {
                population
            }
        }
    }
`;

export default CURRENT_WEATHER_QUERY;