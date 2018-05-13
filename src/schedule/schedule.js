import React, {Component} from "react";
import Hours from "./hours";
import Time from "./time";
import Period from "./period";
import Event from "./event";
import Week from "./week";

class Schedule extends Component {
    constructor() {
        super();

        let weekdays = {
            monday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "monday", "#4285F4", "#fff"),
                    new Event("Polish", new Period(new Time(9, 30), new Time(10, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "monday", "#FBBC05", "#fff")
                ]
            },
            tuesday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#34A853", "#fff"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#EA4335", "#fff"),
                    new Event("Physics", new Period(new Time(13, 0), new Time(16, 0)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "tuesday", "#EA4335", "#fff")
                ]
            },
            wednesday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "wednesday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "wednesday")
                ]
            },
            thursday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "thursday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "thursday")
                ]
            },
            friday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "friday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "friday")
                ]
            },
            saturday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "saturday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "saturday")
                ]
            },
            sunday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "sunday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "Lorem ipsum", "Lorem ipsum dolor sit amet", "sunday")
                ]
            }
        };
        const hours = new Hours(8, 16, 15);
        const periods = this.getPeriods(hours);
        Object.keys(weekdays).forEach(weekday => {
            weekdays[weekday].events = this.generateEvents(weekdays[weekday], periods);
        });

        this.state = {
            image1: "project_principles.jpg",
            image2: "img3.jpg",
            periods: periods,
            weekdays: weekdays
        };
    }

    // noinspection JSUnusedGlobalSymbols
    componentDidMount = () => {

    };

    getPeriods = hours => {
        const times = hours.generateTimes();
        let periods = [];

        for (let i = 0; i < times.length - 1; ++i)
            periods.push(new Period(times[i], times[i + 1]));

        return periods;
    };

    generateEvents = (weekday, periods) => {
        let events = [];
        let i = 0;

        periods.forEach(period => {
            if (i < weekday.events.length) {
                if (period.end.toNumber() <= weekday.events[i].period.start.toNumber()) {
                    events.push(new Event(null, period));
                }
                else if (period.end.toNumber() === weekday.events[i].period.end.toNumber()) {
                    events.push(weekday.events[i++]);
                }
            } else {
                events.push(new Event(null, period));
            }
        });

        return events;
    };



    render() {
        return (<Week weekdays={this.state.weekdays} periods={this.state.periods}/>);
    }
}

export default Schedule;