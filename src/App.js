import React, { Component } from 'react';
import { Route, HashRouter } from "react-router-dom";
import Menu from "./menu";
import Home from "./home";
import Contact from "./contact";
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import './App.css';

// import logo from './logo.svg';
// import axios from 'axios';
// import $ from "jquery";
// noinspection ES6CheckImport

// import { Parallax, Background } from 'react-parallax';

class App extends Component {
    constructor() {
        super();
        this.state = {
            image1: "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            insideStyles: {background: 'white', padding: 20, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'},
            links: [
                {
                    name: "Home",
                    to: "/",
                    exact: true
                },
                {
                    name: "Contact",
                    to: "/Contact",
                    exact: false
                }
            ]
        };
    }

    render() {
        return (
            <HashRouter>
                <Grid>
                    <Row>
                        <PageHeader>
                            Example page header <small>Subtext for header</small>
                        </PageHeader>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Menu links={this.state.links}/>
                        </Col>
                        <Col md={12}>
                            <div className="content">
                                <Route exact path="/" component={Home}/>
                                <Route path="/contact" component={Contact}/>
                            </div>
                            <Parallax bgImage={this.state.image1} strength={500}>
                                <div style={{height: 500}}>
                                    <div style={this.state.insideStyles}>HTML inside the parallax</div>
                                </div>
                            </Parallax>
                            <div className="content">
                                <Route exact path="/" component={Home}/>
                                <Route path="/contact" component={Contact}/>
                            </div>
                            <Parallax bgImage={this.state.image1} strength={500}>
                                <div style={{height: 500}}>
                                    <div style={this.state.insideStyles}>HTML inside the parallax</div>
                                </div>
                            </Parallax>
                            <div className="content">
                                <Route exact path="/" component={Home}/>
                                <Route path="/contact" component={Contact}/>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </HashRouter>
        );
    }
}

export default App;