import React, { Component } from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import Menu from "./menu/menu";
import Home from "./home";
import Contact from "./contact";
import Schedule from "./schedule/schedule";
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import {Parallax} from 'react-parallax';
import './App.css';
import Notes from "./notes/notes";
import axios from 'axios';


// import logo from './logo.svg';
// import axios from 'axios';
// import $ from "jquery";
// noinspection ES6CheckImport
// import { Parallax, Background } from 'react-parallax';

export default class App extends Component {
    state = {
        image1: "abstract-art-artificial-131634.jpg",
        image2: "abstract-art-background-1020317.jpg",
        links: []
    };

    componentDidMount() {
        axios
            .get('http://localhost:8081/links')
            .then((response) => this.setState({links: response.data}))
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <BrowserRouter>
                <Parallax bgImage={this.state.image2} strength={500}>
                    {/*<div>*/}
                        <Grid fluid>
                            <Row>
                                {/*<Parallax bgImage={this.state.image1} strength={500}>*/}
                                    <PageHeader>
                                        Example page header <small>Subtext for header</small>
                                    </PageHeader>
                                {/*</Parallax>*/}
                            </Row>
                        </Grid>
                        <Grid>
                            <Row>
                                <br/>
                                <Col md={12}>
                                    <Menu links={this.state.links}/>
                                </Col>
                                <br/>
                                <br/>
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
                    {/*</div>*/}
                </Parallax>
            </BrowserRouter>
        );
    }
}
