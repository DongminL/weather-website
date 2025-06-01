class Weather {
    constructor(data) {
        this.temp = data.main.temp;
        this.feelsLike = data.main.feels_like;
        this.minTemp = data.main.temp_min;
        this.maxTemp = data.main.temp_max;
        this.pressure = data.main.pressure;
        this.humidity = data.main.humidity;
        this.iconCode = data.weather[0].icon;
        this.description = data.weather[0].description;
    }
}

class Wind {
    constructor(data) {
        this.speed = data.speed;
        this.degree = data.deg;
    }
}

class Location {
    constructor(data) {
        this.country = data.country;
        this.sunrise = data.sunrise;
        this.sunset = data.sunset;
    }
}

class City {
    constructor(data) {
        this.population = data.population;
    }
}

class HourlyWeatherResponse {
    constructor(data) {
        this.utcTimestamp = data.dt;
        this.weather = new Weather(data);
        this.wind = new Wind(data.wind)
    }
}

export class CurrentWeatherResponse {
    constructor(data) {
        this.utcTimestamp = data.dt;
        this.weather = new Weather(data);
        this.wind = new Wind(data.wind);
        this.location = new Location(data.sys);
    }
}

export class ForecastResponse {
    constructor(data) {
        this.hourlyWeatherList = this.toHourlyWeahterList(data.list);
        this.city = new City(data.city);
    }

    toHourlyWeahterList(dataList) {
        return dataList.map(data => new HourlyWeatherResponse(data))
    }
}