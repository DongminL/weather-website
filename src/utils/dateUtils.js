import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const timestampToDate = (timestamp, timezone, format) => {
    dayjs.tz.setDefault(timezone);
    return dayjs.tz(toMilliseconds(timestamp))
        .format(format);
}

export const nowUtcTimestamp = () => {
    return dayjs().utc().valueOf();
}

function toMilliseconds(timestamp) {
    if (String(timestamp).length == 10) {
        return timestamp * 1000;  // seconds -> milliseconds
    }
    return timestamp;
}