class Coordinate {
    constructor(lat, lon) {
        this._lat = lat;
        this._lon = lon;
    }

    get lat() {
        return this._lat;
    }

    get lon() {
        return this._lon;
    }
}

export const Cities = Object.freeze({
    SEOUL: Object.freeze(new Coordinate(37.5666791, 126.9782914)),
    TOKYO: Object.freeze(new Coordinate(35.6828387, 139.7594549)),
    PARIS: Object.freeze(new Coordinate(48.8588897, 2.3200410217200766)),
    LONDON: Object.freeze(new Coordinate(51.5073219, -0.1276474)),

    fromValue(value) {
        const key = String(value).toUpperCase();
        return this[key] instanceof Coordinate ? this[key] : new Error("변환할 수 없는 도시입니다.");
    },

    values() {
        return [this.SEOUL, this.TOKYO, this.PARIS, this.LONDON];
    }
});