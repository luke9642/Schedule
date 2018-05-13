import React, { Component } from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import Menu from "./menu";
import Home from "./home";
import Contact from "./contact";
import Schedule from "./schedule/schedule";
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import {Parallax} from 'react-parallax';
import './App.css';
import Notes from "./notes/notes";

// import logo from './logo.svg';
// import axios from 'axios';
// import $ from "jquery";
// noinspection ES6CheckImport
// import { Parallax, Background } from 'react-parallax';

class App extends Component {
    constructor() {
        super();

        this.state = {
            image1: "project_principles.jpg",
            image2: "img3.jpg",
            links: [
                {
                    name: "Home",
                    to: "/",
                    exact: true,
                    subLinks: {
                        name: "Home",
                        to: "/#qwe"
                    }
                },
                {
                    name: "Contact",
                    to: "/Contact"
                },
                {
                    name: "Notes",
                    to: "/Notes"
                },
                {
                    name: "Schedule",
                    to: "/Schedule"
                }
            ]
        };
    }

    render() {
        return (
            <BrowserRouter>
                {/*<Parallax bgImage={this.state.image2} strength={500}>*/}
                <div>
                    <Grid fluid>
                        <Row>
                            <Parallax bgImage={this.state.image1} strength={500}>
                                <PageHeader>
                                    Example page header <small>Subtext for header</small>
                                </PageHeader>
                            </Parallax>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Menu links={this.state.links}/>
                            </Col>
                            <Col md={12}>
                                <div className="content">
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/contact" component={Contact}/>
                                    <Route path="/notes" component={Notes}/>
                                    <Route path="/schedule" component={Schedule}/>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                {/*</Parallax>*/}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;