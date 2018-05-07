import Time from "./time";

class Hours {
    constructor(initialHour, endHour, interval) {
        // this.permittedIntervals = [15, 30, 45, 60];
        this.initialTime = new Date(0, 0, 0, initialHour, 0, 0, 0);
        this.endTime = new Date(0, 0, 0, endHour, 0, 0, 0);
        this.interval = interval;
    }

    addMinutesToDate = (previousDate, minutesInterval) => new Date(previousDate.getTime() + minutesInterval * 60000);

    generateTimes = () => {
        let times = [];
        let time = this.initialTime;

        while (time.getTime() <= this.endTime.getTime()) {
            times.push(time);
            time = this.addMinutesToDate(time, this.interval);
        }

        return times.map(time => new Time(time.getHours(), time.getMinutes()));
    };
}

export default Hours;