import React from "react";
import "./week.css";

const Cell = ({className, color, height, children, backgroundColor, colour}) => {
    return (
        <li className={className} style={{height: height}}><a style={{backgroundColor: backgroundColor, color: colour}}>{children}</a></li>
    );
};

const Weekday = ({events, standardHeight}) => {
    const createLI = events.map(event => {
        const height = event.period.getDifference() * standardHeight * 4;

        return (
            <Cell className={event.name !== "" ? "event" : ""} key={event.id} height={height} backgroundColor={event.backgroundColor} colour={event.color}>
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
    const createHeader = Object.keys(weekdays).map(weekday => <li key={weekday} style={{flex: 4}}>{weekday}</li>);
    const createColumn = Object.keys(weekdays).map(weekday => (<li key={weekday} style={{flex: 4}}><Weekday events={weekdays[weekday].events} standardHeight={standardHeight}/></li>));
    const createTimes = periods.map(period => <Cell height={standardHeight}>{period.start.toString() + " - " + period.end.toString()}</Cell>);

    return [
        <ul className="head">
            <li className="numbers">
                #
            </li>
            {createHeader}
            </ul>,
        <ul className="outside">
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