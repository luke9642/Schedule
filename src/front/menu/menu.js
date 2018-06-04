import React, { Component } from "react";
import "./menu.css";
import DropdownList from "./dropdownList";
import LinkButton from "./linkButton";
import {Route} from "react-router-dom";

export default class Menu extends Component {
    createLinks = () => this.props.links.map(link => {
        let resultLink;

        if (!link.subLinks) {
            resultLink = (
                <Route key={link.name} path={link.to} children={({ match }) => (
                    <li className={match ? "active" : null}>
                        <LinkButton to={link.to} exact={link.exact}>{link.name}</LinkButton>
                    </li>
                )}/>
            );
        } else {
            resultLink = (
                <Route key={link.name} exact path={link.to} children={({ match }) => (
                    <DropdownList link={link} className={match ? "active" : ""}/>
                )}/>
            );
        }

        return resultLink;
    });

    render() {
        return (
            <div className="nav nav-tabs nav-justified">
                {this.createLinks()}
            </div>
        );
    }
}