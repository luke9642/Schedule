import React from "react";
import Cell from "./cell";
import "./week.css";

const Weekday = ({events, standardHeight}) => {
    const createLI = events.map(event => {
        const height = event.period.getDifference() * standardHeight * 4;
        const background = event.backgroundColor === undefined ? "#fff" : event.backgroundColor;
        let className = event.name === "" ? "" : "event";
        const color = event.color === undefined ? "#000" : event.color;
        const style = {height: height, backgroundColor: background, color: color};

        if (event.period.start.minutes === 0)
            className += " fullHour";

        return (
            <Cell className={className} key={event.hashCode()} style={style}>
                {event.name}
            </Cell>
        );
    });

    return (
        <ul className="inside">{createLI}</ul>
    );
};

const Week = ({weekdays, periods}) => {
    const standardHeight = 25;
    const style = {backgroundColor: "transparent", color: "#000", height: standardHeight};
    const createHeader = Object.keys(weekdays).map(weekday => <li key={weekday} style={{flex: 1}}>{weekday}</li>);
    const createColumn = Object.keys(weekdays).map(weekday => <li key={weekday} style={{flex: 1}}><Weekday events={weekdays[weekday].events} standardHeight={standardHeight}/></li>);
    const createTimes = periods.map(period => {
        let className = "";

        if (period.start.minutes === 0)
            className = "fullHour";
        return <Cell key={period.hashCode()} className={className} style={style}>{period.toString()}</Cell>;
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