import "../hashCode";

class Event {
    constructor(name, period, description, weekday="", backgroundColor, color) {
        this.name = name;
        this.period = period;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.weekday = weekday;
    }

    hashCode = () => this.name.hashCode() + this.period.hashCode() + this.description.hashCode() + this.weekday.hashCode();
}

export default Event;