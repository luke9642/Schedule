class Time {
    constructor(hours, minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }


    getNoOfMinutes = () => this.hours * 60 + this.minutes;

    toDate = () => new Date(0, 0, 0, this.hours, this.minutes, 0, 0);

    createTimeFromDate = date => new Time(date.getHours(), date.getMinutes());

    // getDifference = otherTime => this.createTimeFromDate(new Date(Math.abs(this.toDate().getTime() - otherTime.toDate().getTime())));

    toNumber = () => this.hours + (this.minutes / 60);

    getAmountOfIntervalsInPeriodOfTime = interval => this.getNoOfMinutes() / interval;

    equals = (otherTime) => this.hours === otherTime.hours && this.minutes === otherTime.minutes;

    toString = () => {
        let hours;
        let minutes;

        if (this.hours < 10)
            hours = "0" + this.hours;
        else
            hours = this.hours;

        if (this.minutes < 10)
            minutes = "0" + this.minutes;
        else
            minutes = this.minutes;
        return hours + ":" + minutes;
    };
}

export default Time;