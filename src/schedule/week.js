import React from "react";
import Cell from "./cells/cell";
import "./week.css";
import TimeCell from "./cells/time_cell";
import EventCell from "./cells/event_cell";

const Weekday = ({events, standardHeight}) => {
    const createLI = events.map(event => {
        let result;
        const style = {
            height: event.period.getDifference() * standardHeight * 4,
            backgroundColor: event.backgroundColor,
            color: event.color
        };

        if (event.name !== null) {
            let className = event.period.start.minutes === 0 ? "event fullHour" : "event";
            result = <EventCell className={className} key={event.hashCode()} style={style} event={event}>{event.name}</EventCell>;
        } else {
            let className = event.period.start.minutes === 0 ? "fullHour" : null;
            result = <Cell className={className} key={event.hashCode()} style={{height: style.height}}/>;
        }

        return result;
    });

    return <ul className="inside">{createLI}</ul>;
};

const Week = ({weekdays, periods}) => {
    const standardHeight = 25;
    const flex = {flex: 1};
    const createHeader = Object.keys(weekdays).map(weekday => <li key={weekday} style={flex}>{weekday}</li>);
    const createColumn = Object.keys(weekdays).map(weekday => <li key={weekday} style={flex}><Weekday events={weekdays[weekday].events} standardHeight={standardHeight}/></li>);
    const createTimes = periods.map(period => {
        let className = "";
        if (period.start.minutes === 0)
            className = "fullHour";
        return <TimeCell key={period.hashCode()} className={className} style={{height: standardHeight}}>{period.toString()}</TimeCell>;
    });

    return [
        <ul key="head" className="head">
            <li className="numbers"/>
            {createHeader}
            </ul>,
        <ul key="outside" className="outside">
            <li className="numbers">
                <ul className="inside">
                    {createTimes}
                </ul>
            </li>
            {createColumn}
        </ul>
    ];
};

export default Week;