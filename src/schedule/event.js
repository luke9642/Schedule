import "../hashCode";

class Event {
    constructor(name, period, description_brief="", description="", weekday="", backgroundColor="#fff", color="#000") {
        this.name = name;
        this.period = period;
        this.description_brief = description_brief;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.color = color;
        this.weekday = weekday;
    }

    hashCode = () => this.period.hashCode() + this.description.hashCode() + this.weekday.hashCode();
}

export default Event;