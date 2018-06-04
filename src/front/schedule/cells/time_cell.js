import React from "react";
import "./cell.css";

export default class TimeCell extends React.Component {
    render() {
        return (
            <li className={this.props.className} style={this.props.style}>{this.props.children}</li>
        );
    }
}