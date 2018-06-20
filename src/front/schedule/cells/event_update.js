import React from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, InputGroup, Modal, Row} from "react-bootstrap";
import axios from "axios/index";
import Time from "../time";

export default class EventUpdate extends React.Component {
    state = {
        name: this.props.event.name,
        description: this.props.event.description,
        weekday: this.props.event.weekday,
        color: this.props.event.color,
        background: this.props.event.backgroundColor,
        start: this.props.start,
        end: this.props.end,
        validation: {
            name: null,
            description: null,
            start: null,
            end: null
        }
    };

    color = (color) => {
        if (color === "#fff")
            return "#ffffff";
        if (color === "#000")
            return "#000000";
        return color;
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const validate = this.validateInput();

        if (!validate.ok) {
            alert(validate.message);
        } else {
            axios({
                method: 'PUT',
                url: 'http://localhost:3001/event',
                data: {
                    oldEvent: this.props.event,
                    newEvent: {
                        name: this.state.name,
                        description: this.state.description,
                        weekday: this.state.weekday,
                        color: this.state.color,
                        background: this.state.background,
                        start: this.state.start,
                        end: this.state.end
                    }
                },
                withCredentials: true
            }).then((response) => {
                this.props.onHide();
                if (response.data.status) {
                    this.props.updateEvents();
                }
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
        }

        // const name = this.state.name !== "" && this.state.name.length < 50;
        // const description = this.state.name !== "" && this.state.name.length < 1000;
        //
        // const [start_hours, start_minutes] = this.state.start.split(":").map(elem => parseInt(elem, 10));
        // const [end_hours, end_minutes] = this.state.end.split(":").map(elem => parseInt(elem, 10));
        // const start_time = start_hours + start_minutes / 60;
        // const end_time = end_hours + end_minutes / 60;
        // console.log(start_time);
        // console.log(end_time);
        // const start = start_time >= 8 && start_time <= 16 && start_time < end_time;
        // const end = end_time >= 8 && end_time <= 16 && start_time < end_time;
        //
        // let validation = {};
        //
        // [
        //     ["name", name],
        //     ["description", description],
        //     ["start", start],
        //     ["end", end]
        // ].forEach(value => validation[value[0]] = value[1] ? "success" : "error");
        //
        // console.log(validation);
        //
        // this.setState({validation: validation});
    };

    validateInput = () => {
        const title = this.state.name;
        const start = this.state.start;
        const end = this.state.end;
        const [startHours, startMinutes] = start.split(":").map(time => parseInt(time, 10));
        const [endHours, endMinutes] = end.split(":").map(time => parseInt(time, 10));

        let startTime = new Time(startHours, startMinutes).toNumber();
        let endTime = new Time(endHours, endMinutes).toNumber();

        if (!title || title.length <= 0)
            return {ok: false, message: "Title is empty"};

        if (title.length > 50)
            return {ok: false, message: "Title is too long"};

        if (this.state.description.length > 1000)
            return {ok: false, message: "Description is too long"};

        if (!this.state.color)
            return {ok: false, message: "Color is invalid"};

        if (!this.state.background)
            return {ok: false, message: "Background is invalid"};

        if (!start)
            return {ok: false, message: "Time start is invalid"};

        if (!end)
            return {ok: false, message: "Time end is invalid"};

        if (startTime < 8)
            return {ok: false, message: "Time start is too little"};

        if (endTime > 16)
            return {ok: false, message: "Time end is too big"};

        if (endTime <= startTime)
            return {ok: false, message: "Time end is less or equals start"};

        return {ok: true};
    };

    removeEvent = (event) => {
        event.preventDefault();

        axios({
            method: 'DELETE',
            url: 'http://localhost:3001/event',
            data: {
                event: this.props.event
            },
            withCredentials: true
        }).then((response) => {
            this.props.onHide();
            if (response.data.status) {
                this.props.updateEvents();
            }
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
        });
    };

    render = () => (
        <form>
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormGroup validationState={this.state.validation.name}>
                            <FormControl name="name" bsSize="lg" type="text" defaultValue={this.state.name} onChange={this.handleInputChange}/>
                        </FormGroup>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup validationState={this.state.validation.description}>
                        <FormControl name="description" componentClass="textarea" defaultValue={this.state.description} onChange={this.handleInputChange}/>
                    </FormGroup>
                </Modal.Body>
                <hr/>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon>Weekday:&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Addon>
                                        <FormControl defaultValue={this.state.weekday} onChange={(event) => this.setState({weekday: event.target.value})} componentClass="select" placeholder="select">
                                            {this.props.weekdays.map(weekday => (<option key={weekday} value={weekday}>{weekday}</option>))}
                                        </FormControl>
                                    </InputGroup>
                                </ControlLabel>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <FormGroup>
                                <ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon>Font color:&nbsp;&nbsp;&nbsp;</InputGroup.Addon>
                                        <FormControl name="color" type="color" value={this.color(this.state.color)} onChange={this.handleInputChange}/>
                                    </InputGroup>
                                </ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup validationState={this.state.validation.start}>
                                <ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon>Start:</InputGroup.Addon>
                                        <FormControl name="start" type="time" step="900" value={this.state.start} onChange={this.handleInputChange}/>
                                    </InputGroup>
                                </ControlLabel>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <FormGroup>
                                <ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon>Background:</InputGroup.Addon>
                                        <FormControl name="background" type="color" value={this.color(this.state.background)} onChange={this.handleInputChange}/>
                                    </InputGroup>
                                </ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup validationState={this.state.validation.end}>
                                <ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon>End:&nbsp;</InputGroup.Addon>
                                        <FormControl name="end" type="time" step="900" value={this.state.end} onChange={this.handleInputChange}/>
                                    </InputGroup>
                                </ControlLabel>
                            </FormGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" bsStyle="danger" onClick={this.removeEvent}>Remove event</Button>
                    <Button type="submit" bsStyle="primary" onClick={this.handleFormSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </form>
    );
}