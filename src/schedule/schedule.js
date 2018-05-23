import React, {Component} from "react";
import Hours from "./hours";
import Period from "./period";
import Event from "./event";
import Week from "./week";
import axios from "axios/index";

class Schedule extends Component {
    state = {
        image1: "project_principles.jpg",
        image2: "img3.jpg",
        periods: [],
        weekdays: {}
    };

    componentDidMount() {
        axios
            .get('http://localhost:8081/events')
            .then((response) => {
                let weekdays = response.data;
                const hours = new Hours(8, 16, 15);
                const periods = this.getPeriods(hours);

                Object.keys(weekdays).forEach(weekday => {
                    weekdays[weekday].events = this.generateEvents(weekdays[weekday], periods);
                });

                this.setState({weekdays: weekdays, periods: periods});
            })
            .catch((error) => {
                console.log(error);
            });
    }

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