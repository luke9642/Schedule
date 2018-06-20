import React, {Component} from 'react';
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";
import {Col, Grid, Row} from 'react-bootstrap';
import axios from 'axios';

import './App.css';

import Notes from "./notes/notes";
import Login from "./login/login";
import Header from "./header/header";
import Menu from "./menu/menu";
import Home from "./home/home";
import Profile from "./profile/profile";
import Schedule from "./schedule/schedule";

// import logo from './logo.svg';

export default class App extends Component {
    state = {
        image: "background-2.jpg",
        links: [],
        loggedIn: false
    };

    componentDidMount() {
        this.updateLinks();
    }

    updateLinks = (loggedIn) => {
        axios
            .get('http://localhost:3001/links', {withCredentials: true})
            .then((response) => {
                let states = {links: response.data};
                if (loggedIn != null)
                    states.loggedIn = loggedIn;
                this.setState(states);
            })
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <BrowserRouter>
                <main style={{backgroundImage: `url(${this.state.image})`, minHeight: window.innerHeight}}>
                    <Header title="Schedule App" links={this.state.links}/>
                    <Menu links={this.state.links} updateLinks={this.updateLinks} loggedIn={this.state.loggedIn}/>
                    <Grid className="main-content pt-20 pb-20">
                        <Row>
                            <Col md={12} style={{overflowX: "auto"}}>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/profile" component={Profile}/>
                                    <Route path="/notes" component={Notes}/>
                                    <Route path="/schedule" component={Schedule}/>
                                    <Route path="/logout" render={() => <Redirect to="/login"/>}/>
                                    <Route path="/login" render={(props) => <Login loggedIn={this.state.loggedIn}
                                                                                   updateLinks={this.updateLinks} {...props}/>}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Grid>
                </main>
            </BrowserRouter>
        );
    }
}