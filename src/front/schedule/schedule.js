import React, {Component} from "react";
import Hours from "./hours";
import Period from "./period";
import Time from "./time";
import Event from "./event";
import Week from "./week";
import axios from "axios/index";

export default class Schedule extends Component {
    state = {
        image1: "project_principles.jpg",
        image2: "img3.jpg",
        periods: [],
        weekdays: {}
    };

    componentDidMount() {
        axios
            .get('http://localhost:3001/events')
            .then((response) => {
                let weekdays = response.data;
                const hours = new Hours(8, 16, 15);
                const periods = this.getPeriods(hours);

                Object.keys(weekdays).forEach(weekday => {
                    let tmp = weekdays[weekday].events.map(
                        event => new Event(
                            event.name,
                            new Period(
                                new Time(event.period.start.hours, event.period.start.minutes),
                                new Time(event.period.end.hours, event.period.end.minutes)
                            ),
                            event.description_brief,
                            event.description,
                            event.weekday,
                            event.backgroundColor,
                            event.color
                        )
                    );
                    weekdays[weekday].events = this.generateEvents(tmp, periods);
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

    generateEvents = (events, periods) => {
        let result_events = [];
        let i = 0;

        periods.forEach(period => {
            if (i < events.length) {
                if (period.end.toNumber() <= events[i].period.start.toNumber()) {
                    result_events.push(new Event(null, period));
                }
                else if (period.end.toNumber() === events[i].period.end.toNumber()) {
                    result_events.push(events[i++]);
                }
            } else {
                result_events.push(new Event(null, period));
            }
        });

        return result_events;
    };



    render() {
        return (<Week weekdays={this.state.weekdays} periods={this.state.periods}/>);
    }
}