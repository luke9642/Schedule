import React, {Component} from "react";
import axios from "axios/index";
import {Button, Col, ControlLabel, Form, FormGroup, Glyphicon, Panel, Row} from "react-bootstrap";
import FormControl from "react-bootstrap/es/FormControl";
import "./login.css";

export default class Login extends Component {
    submitLogin = () => {
        axios
            .post('http://localhost:3001/login', {
                login: "12123312",
                password: "dsasd"
            })
            .then((response) => {
                console.log("then");
                console.log(response);
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    };

    submitSignup = () => {
        axios
            .post('http://localhost:3001/signup', {
                login: "12123312",
                password: "dsasd",
                name: "Luke",
                surname: "Kowalski"
            })
            .then((response) => {
                console.log("then");
                console.log(response);
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
            });
    };

    render() {
        return (
            <Row className="margin-top-20">
                <Col md={6}>
                    <Panel bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title>
                                <ControlLabel htmlFor="signin">
                                    <h3>Sign in</h3>
                                    <h3><Glyphicon glyph="log-in"/></h3>
                                </ControlLabel>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Form horizontal>
                                <FormGroup controlId="signin">
                                    <Col md={12}>
                                        <FormControl bsSize="lg"  type="text" placeholder="Login" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl bsSize="lg"  type="password" placeholder="Password" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <Button block className="width-100" bsSize="lg" bsStyle="primary" type="submit" onClick={this.submitLogin}>Sign in</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title>
                                <ControlLabel htmlFor="signup">
                                    <h3>Sign up</h3>
                                    <h3><Glyphicon glyph="plus"/></h3>
                                </ControlLabel>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Form horizontal>
                                <FormGroup controlId="signup">
                                    <Col md={12}>
                                        <FormControl bsSize="lg"  type="text" placeholder="Login" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl bsSize="lg"  type="password" placeholder="Password" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl bsSize="lg"  type="test" placeholder="Name" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl bsSize="lg"  type="test" placeholder="Surname" />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <Button block className="width-100" bsSize="lg" bsStyle="primary" type="submit" onClick={this.submitSignup}>Sign up</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

//headers: { "Authorization": axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken') },