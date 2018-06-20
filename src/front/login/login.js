import React, {Component} from "react";
import axios from "axios/index";
import {FormControl, Button, Col, ControlLabel, Form, FormGroup, Glyphicon, Panel, Row, Alert} from "react-bootstrap";
import Cookies from 'universal-cookie';
import "./login.css";

export default class Login extends Component {
    state = {
        showAlert: false,
        message: "",
        loginUsername: "",
        loginPassword: "",
        signupUsername: "",
        signupPassword: "",
        name: "",
        surname: ""
    };

    componentDidMount() {
        if (this.props.loggedIn)
            this.setState({showAlert: true, message: "Successfully logged out"});
    }

    componentDidUpdate() {
        if (this.props.loggedIn)
            this.props.updateLinks(false);
    }

    submitLogin = (event) => {
        event.preventDefault();
        const validate = this.validateLogin();

        if (!validate.ok) {
            alert(validate.message);
        } else {
            axios
                .post('http://localhost:3001/login', {
                    username: this.state.loginUsername,
                    password: this.state.loginPassword,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    crossDomain: true,
                    mode: 'no-cors',
                    credentials: 'same-origin'
                })
                .then((response) => {
                    if (response.data.status) {
                        new Cookies().set("jwt", response.data.token, {path: "/"});
                        this.props.updateLinks(true);
                        this.props.history.push("/profile");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        alert("Login or password are invalid");
                    } else {
                        alert("Undefined response");
                    }
                });
        }
    };

    validateLogin = () => {
        const login = this.state.loginUsername;
        const password = this.state.loginPassword;

        if (login.length <= 0)
            return {ok: false, message: "Login empty"};

        if (login.length > 20)
            return {ok: false, message: "Login too long"};

        if (password.length <= 0)
            return {ok: false, message: "Password empty"};

        if (password.length > 20)
            return {ok: false, message: "Password too long"};

        return {ok: true};
    };

    submitSignup = (event) => {
        event.preventDefault();
        const validate = this.validateSignup();

        if (!validate.ok) {
            alert(validate.message);
        } else {
            axios
                .post('http://localhost:3001/signup', {
                    username: this.state.signupUsername,
                    password: this.state.signupPassword,
                    name: this.state.name,
                    surname: this.state.surname
                })
                .then((response) => {
                    this.setState({showAlert: true, message: "Now you can log in"});
                })
                .catch((error) => {
                    console.log("error");
                    console.log(error);
                });
        }
    };

    validateSignup = () => {
        const login = this.state.signupUsername;
        const password = this.state.signupPassword;
        const name = this.state.name;
        const surname = this.state.surname;

        if (login.length <= 6)
            return {ok: false, message: "Login too short"};

        if (login.length > 20)
            return {ok: false, message: "Login too long"};

        if (password.length <= 6)
            return {ok: false, message: "Password too short"};

        if (password.length > 20)
            return {ok: false, message: "Password too long"};

        if (name.length <= 0)
            return {ok: false, message: "Name too short"};

        if (name.length > 20)
            return {ok: false, message: "Name too long"};

        if (surname.length <= 0)
            return {ok: false, message: "Surname too short"};

        if (surname.length > 20)
            return {ok: false, message: "Surname too long"};

        return {ok: true};
    };

    render() {
        return (
            <Row className="margin-top-20">
                <Col md={12} className={this.state.showAlert ? "info-alert show" : "info-alert"}>
                    <Alert bsStyle="warning" onDismiss={() => this.setState({showAlert: false})}>
                        <h3>{this.state.message}</h3>
                    </Alert>
                </Col>
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
                                        <FormControl onChange={(event) => this.setState({loginUsername: event.target.value})} bsSize="lg" type="text" placeholder="Login"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl onChange={(event) => this.setState({loginPassword: event.target.value})} bsSize="lg" type="password" placeholder="Password"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <Button block className="width-100" bsSize="lg" bsStyle="primary" type="submit"
                                                onClick={this.submitLogin}>Sign in</Button>
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
                                        <FormControl onChange={(event) => this.setState({signupUsername: event.target.value})} bsSize="lg" type="text" placeholder="Login"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl onChange={(event) => this.setState({signupPassword: event.target.value})} bsSize="lg" type="password" placeholder="Password"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl onChange={(event) => this.setState({name: event.target.value})} bsSize="lg" type="test" placeholder="Name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <FormControl onChange={(event) => this.setState({surname: event.target.value})} bsSize="lg" type="test" placeholder="Surname"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <Button block className="width-100" bsSize="lg" bsStyle="primary"
                                                onClick={this.submitSignup}>Sign up</Button>
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
