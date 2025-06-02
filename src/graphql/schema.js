import { gql } from "graphql-tag"

export const typeDefs = gql`
    type Query {
        currentWeather(cityName: String!): CurrentWeather
        forecast(cityName: String!): Forecast
    }

    type CurrentWeather {
        utcTimestamp: Int
        weather: Weather
        wind: Wind
        location: Location
    }

    type Forecast {
        hourlyWeatherList: [HourlyWeather]
        city: City
    }

    type HourlyWeather {
        utcTimestamp: Int
        weather: Weather
        wind: Wind
    }

    type Weather {
        temp: Float
        feelsLike: Float
        minTemp: Float
        maxTemp: Float
        pressure: Int
        humidity: Int
        iconCode: String
        description: String
    }

    type Wind {
        speed: Float
        degree: Int
    }

    type Location {
        country: String 
        sunrise: Int
        sunset: Int
    }

    type City {
        name: String
        country: String
        population: Int 
    }
`;