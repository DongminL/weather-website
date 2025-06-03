import { gql } from "@apollo/client";

const FORECAST_QUERY = gql`
    query GetForecast($cityName: String!) {
        forecast(cityName: $cityName) {
            hourlyWeatherList {
                utcTimestamp
                weather {
                    temp
                    minTemp
                    maxTemp
                    description
                    iconCode
                }
            }
        }
    }
`;

export default FORECAST_QUERY;