class Event {
    constructor(name, period, description, weekday, backgroundColor, color) {
        this.id = this.hashCode(
            name +
            period.start.hours +
            period.start.minutes +
            period.end.hours +
            period.end.minutes +
            description +
            weekday
        );
        this.name = name;
        this.period = period;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.color = color;
    }

    hashCode(str) {
        let hash = 0, i, chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
}

export default Event;