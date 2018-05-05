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
                    new Event("English", new Period(new Time(8, 0), new Time(9, 30)), "", "monday", "#4285F4", "#fff"),
                    new Event("Polish", new Period(new Time(9, 30), new Time(10, 30)), "", "monday", "#FBBC05", "#fff")
                ]
            },
            tuesday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "", "tuesday", "#34A853", "#fff"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "", "tuesday", "#EA4335", "#fff"),
                    new Event("Physics", new Period(new Time(13, 0), new Time(16, 0)), "", "tuesday", "#EA4335", "#fff")
                ]
            },
            wednesday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "", "wednesday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "", "wednesday")
                ]
            },
            thursday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "", "thursday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "", "thursday")
                ]
            },
            friday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "", "friday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "", "friday")
                ]
            },
            saturday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "", "saturday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "", "saturday")
                ]
            },
            sunday: {
                events: [
                    new Event("English", new Period(new Time(8, 0), new Time(8, 30)), "", "sunday"),
                    new Event("Polish", new Period(new Time(9, 0), new Time(9, 30)), "", "sunday")
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

    componentDidMount() {

    }

    getPeriods = hours => {
        const times = hours.generateTimes();
        let periods = [];

        for (let i = 0; i < times.length - 1; ++i)
            periods.push(new Period(times[i], times[i + 1]));

        return periods;
    };

    // tmp() {
    //     const times = this.state.hours.generateTimes();
    //     const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    //     let arr = new Array(8);
    //
    //     for (let i = 0; i < 8; i++) {
    //         arr[i] = new Array(times.length);
    //     }
    //
    //     for (let i = 0; i < times.length; ++i) {
    //         arr[0][i] = times[i];
    //     }
    //     //
    //     // weekdays.forEach(weekday => {
    //     //     this.state.weekdays[weekday].generateEvents.forEach(event => {
    //     //         // arr[weekdays.findIndex(weekday)][] times.findIndex(time => time.equals(event.start));
    //     //
    //     //     });
    //     //
    //     //     // hours.initialTime;
    //     //     // arr[][i]+
    //     // });
    //
    //     return arr;
    // }
    //
    // const getRow = (row) => row.map(cell => (<th>{cell}</th>));
    //
    // const LinkButton = ({to, exact=false, children}) => (
    //     <NavLink className="btn btn-default" exact={exact} to={to} activeClassName="btn-primary">{children}</NavLink>
    // );
    //
    // const createLinks = links.map(link => (<LinkButton key={link.name} to={link.to} exact={link.exact}>{link.name}</LinkButton>));

    generateEvents = (weekday, periods) => {
        let events = [];
        let i = 0;

        periods.forEach(period => {
            if (i < weekday.events.length) {
                if (period.end.toNumber() <= weekday.events[i].period.start.toNumber()) {
                    events.push(new Event("", period, ""));
                }
                else if (period.end.toNumber() === weekday.events[i].period.end.toNumber()) {
                    events.push(weekday.events[i++]);
                }
            } else {
                events.push(new Event("", period, ""));
            }
        });

        return events;
    };



    render() {
        return (<Week weekdays={this.state.weekdays} periods={this.state.periods}/>);
    }
}

export default Schedule;