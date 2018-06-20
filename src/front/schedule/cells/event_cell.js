import React from "react";
import {Button, Glyphicon, OverlayTrigger, Popover} from "react-bootstrap";
import "./cell.css";
import EventUpdate from "./event_update";

export default class EventCell extends React.Component {
    constructor(props) {
        super(props);
        const normalBackground = this.props.style.backgroundColor;
        const brightBackground = this.increase_brightness(this.props.style.backgroundColor, 20);

        const title = (
            <div className="popoverTitle">
                <strong>{this.props.event.name}</strong>
                <span onClick={() => this.setState({show: true})}>
                    <Glyphicon glyph="edit"/>
                </span>
            </div>
        );

        this.state = {
            normalBackground: normalBackground,
            brightBackground: brightBackground,
            listStyle: {
                height: this.props.style.height,
            },
            linkStyle: {
                color: this.props.style.color,
                background: normalBackground
            },
            popoverLeft: (
                <Popover id={this.props.event.hashCode()} title={title}>
                    <div>{this.props.event.description}</div>
                    <br/>
                    <div style={{textAlign: "right"}}>
                        <i>{this.props.event.period.toString()}</i>
                    </div>
                </Popover>
            ),
            show: false
        };
    }

    increase_brightness = (hex, percent) => {
        // strip "#" if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (hex.length === 3)
            hex = hex.replace(/(.)/g, '$1$1');

        const r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);
        const calculate = color => ((0 | (1 << 8) + color + (256 - color) * percent / 100).toString(16)).substr(1);
        return '#' + calculate(r) + calculate(g) + calculate(b);
    };

    setBackground = (background) => {
        let style = Object.assign({}, this.state.linkStyle);
        style.background = background;
        this.setState({linkStyle: style});
    };

    getProperTime = (time) => {
        const tmpHours = time.hours;
        const tmpMinutes = time.minutes;
        const hours = tmpHours < 10 ? "0" + tmpHours : tmpHours;
        const minutes = tmpMinutes < 10 ? "0" + tmpMinutes : tmpMinutes;
        return hours + ":" + minutes;
    };

    // noinspection JSUnusedGlobalSymbols
    render = () => (
        <li className={this.props.className} style={this.state.listStyle}>
            <OverlayTrigger trigger="focus" placement="left" overlay={this.state.popoverLeft}>
                <Button href="#" bsClass="eventButton" style={this.state.linkStyle}
                    onMouseOver={() => this.setBackground(this.state.brightBackground)}
                    onMouseOut={() => this.setBackground(this.state.normalBackground)}
                >
                    {this.props.children}
                </Button>
            </OverlayTrigger>
            <EventUpdate
                weekdays={this.props.weekdays}
                event={this.props.event}
                start={this.getProperTime(this.props.event.period.start)}
                end={this.getProperTime(this.props.event.period.end)}
                show={this.state.show}
                onHide={() => this.setState({show: false})}
                updateEvents={this.props.updateEvents}
            />
        </li>
    );
}