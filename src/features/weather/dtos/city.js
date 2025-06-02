class City {
    constructor(lat, lon, timezone) {
        this.lat = lat;
        this.lon = lon;
        this.timezone = timezone;
    }
}

export const Cities = Object.freeze({
    SEOUL: Object.freeze(new City(37.5666791, 126.9782914, "Asia/Seoul")),
    TOKYO: Object.freeze(new City(35.6828387, 139.7594549, "Asia/Tokyo")),
    PARIS: Object.freeze(new City(48.8588897, 2.3200410217200766, "Europe/Paris")),
    LONDON: Object.freeze(new City(51.5073219, -0.1276474, "Europe/London")),

    fromValue(value) {
        const key = String(value).toUpperCase();

        if (!this[key] instanceof City) {
            throw new Error("존재하지 않는 도시입니다.");
        }
        return this[key];
    },

    values() {
        return [this.SEOUL, this.TOKYO, this.PARIS, this.LONDON];
    }
});