class Info {
    constructor(data) {
        this.id = data.id;
        this.description = data.description;
        this.icon = data.icon;
    }
}

class Weather {
    constructor(data) {
        this.temp = data.temp;
        this.feelsLike = data.feels_like;
        this.minTemp = data.temp_min;
        this.maxTemp = data.temp_max;
        this.pressure = data.pressure;
        this.humidity = data.humidity;
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

export class HourlyWeatherResponse {
    constructor(data) {
        this.utcTimestamp = data.dt;
        this.info = new Info(data.weather[0]);
        this.weather = new Weather(data.main);
    }
}

export class CurrentWeatherResponse {
    constructor(data) {
        this.utcTimestamp = data.dt;
        this.info = new Info(data.weather[0]);
        this.weather = new Weather(data.main);
        this.wind = new Wind(data.wind);
        this.location = new Location(data.sys);
    }
}

export class ForecastResponse {
    constructor(data) {
        console.info(data);
        this.hourlyWeatherList = this.toHourlyWeahterList(data.list);
        this.city = new City(data.city);
    }

    toHourlyWeahterList(dataList) {
        return dataList.map(data => new HourlyWeatherResponse(data))
    }
}