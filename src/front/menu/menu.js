import React, { Component } from "react";
import DropdownList from "./dropdownList";
import LinkButton from "./linkButton";
import {Route} from "react-router-dom";
import Cookies from "universal-cookie";
import {Grid} from "react-bootstrap";
import "./menu.css";

export default class Menu extends Component {
    logout = (match, linkName) => {
        if (match && linkName === "Logout") {
            new Cookies().remove("jwt");
            this.props.updateLinks(true);
        }
    };

    createLinks = () => this.props.links.map(link => {
        let resultLink;

        if (!link.subLinks) {
            resultLink = (
                <Route key={link.name} path={link.to} children={({ match }) => (
                    <li className={match ? "active" : null}>
                        <LinkButton isActive={(match) => this.logout(match, link.name)} to={link.to} exact={link.exact}>
                            {link.name}
                        </LinkButton>
                    </li>
                )}/>
            );
        } else {
            resultLink = (
                <Route key={link.name} exact path={link.to} children={({ match }) => (
                    <DropdownList link={link} className={match ? "active" : null}/>
                )}/>
            );
        }

        return resultLink;
    });

    createNav = () => this.props.links.map(link => (
            <Route key={link.name} exact path={link.to} render={() => (
                <div style={{backgroundColor: link.color}}>
                    <Grid className="p-0">
                        <nav className="nav nav-tabs nav-justified">
                            {this.createLinks()}
                        </nav>
                    </Grid>
                </div>
            )}/>
        )
    );


    render() {
        return (
            <div className="sticky-nav">
                {this.createNav()}
            </div>
        );
    }
}