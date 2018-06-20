import React, {Component} from "react";
import Hours from "./hours";
import Period from "./period";
import Time from "./time";
import Event from "./event";
import Week from "./week";
import axios from "axios/index";
import {Button, Col, ControlLabel, FormControl, Glyphicon, InputGroup, Modal, Row} from "react-bootstrap";
import "./schedule.css";

export default class Schedule extends Component {
    state = {
        image1: "project_principles.jpg",
        image2: "img3.jpg",
        periods: [],
        weekdays: {},
        title: "",
        description: "",
        weekday: "monday",
        color: "#000000",
        background: "#ffffff",
        start: "08:00",
        end: "09:00"
    };

    componentDidMount() {
        this.updateEvents();
    }

    updateEvents = () => {
        axios
            .get('http://localhost:3001/events', {withCredentials: true})
            .then((response) => {
                let weekdays = response.data;
                const hours = new Hours(8, 16, 15);
                const periods = this.getPeriods(hours);

                Object.keys(weekdays).forEach(weekday => {
                    let tmp = weekdays[weekday].events.map(
                        event => new Event(
                            event.name,
                            new Period(
                                new Time(event.period.start.hours, event.period.start.minutes),
                                new Time(event.period.end.hours, event.period.end.minutes)
                            ),
                            event.description_brief,
                            event.description,
                            event.weekday,
                            event.backgroundColor,
                            event.color
                        )
                    );
                    weekdays[weekday].events = this.generateEvents(tmp, periods);
                });

                this.setState({weekdays: weekdays, periods: periods});
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push("/login");
            });
    };

    getPeriods = hours => {
        const times = hours.generateTimes();
        let periods = [];

        for (let i = 0; i < times.length - 1; ++i)
            periods.push(new Period(times[i], times[i + 1]));

        return periods;
    };

    generateEvents = (events, periods) => {
        let emptyEvents = periods.map(period => new Event(null, period));

        events.forEach(event => {
            const start = event.period.start.toNumber();
            const end = event.period.end.toNumber();
            let startIndex = -1;
            let numOfElems = 0;

            for (let i = 0; i < emptyEvents.length; ++i) {
                const emptyEventStart = emptyEvents[i].period.start.toNumber();
                if (emptyEventStart >= start && emptyEventStart < end) {
                    if (startIndex === -1)
                        startIndex = i;
                    ++numOfElems;
                }
            }

            emptyEvents.splice(startIndex, numOfElems, event);
        });

        return emptyEvents;
    };

    handleNewEvent = (event) => {
        event.preventDefault();
        const validate = this.validateInput();

        if (!validate.ok) {
            alert(validate.message);
        } else {
            axios({
                method: 'POST',
                url: 'http://localhost:3001/event',
                data: {
                    title: this.state.title,
                    description: this.state.description,
                    weekday: this.state.weekday,
                    color: this.state.color,
                    background: this.state.background,
                    start: this.state.start,
                    end: this.state.end
                },
                withCredentials: true,
            }).then((response) => {
                this.setState({show: false});
                if (response.data.status) {
                    this.updateEvents();
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert("Invalid user");
                }
                else if (error.response.status === 400) {
                    alert(error.response.data.message);
                }
                else {
                    alert("Undefined response");
                }
            });
        }
    };

    validateInput = () => {
        const weekdays = Object.keys(this.state.weekdays);
        const title = this.state.title;
        const weekday = this.state.weekday;
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

        if (!weekday || !weekdays.includes(weekday))
            return {ok: false, message: "Weekday is invalid"};

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

    render() {
        const weekdays = Object.keys(this.state.weekdays);
        return (
            <div style={{minWidth: "1140px"}}>
                <Week updateEvents={this.updateEvents} key="week" weekdays={this.state.weekdays} periods={this.state.periods}/>,
                <Button bsStyle="primary" id="add-event" key="add" onClick={() => this.setState({show: true})}>
                    <Glyphicon glyph="plus"/>
                </Button>
                <form key="modal">
                    <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title><FormControl onChange={(event) => this.setState({title: event.target.value})} bsSize="lg" type="text" placeholder="Title"/></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl onChange={(event) => this.setState({description: event.target.value})} componentClass="textarea" placeholder="Description"/>
                        </Modal.Body>
                        <hr/>
                        <Modal.Body>
                            <Row>
                                <Col md={12}>
                                    <ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>Weekday:&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Addon>
                                            <FormControl defaultValue={this.state.weekday} onChange={(event) => this.setState({weekday: event.target.value})} componentClass="select" placeholder="select">
                                                {weekdays.map(weekday => (<option key={weekday} value={weekday}>{weekday}</option>))}
                                            </FormControl>
                                        </InputGroup>
                                    </ControlLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>Font color:&nbsp;&nbsp;&nbsp;</InputGroup.Addon>
                                            <FormControl onChange={(event) => this.setState({color: event.target.value})} type="color" defaultValue={this.state.color}/>
                                        </InputGroup>
                                    </ControlLabel>
                                </Col>
                                <Col md={4}>
                                    <ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>Start:</InputGroup.Addon>
                                            <FormControl onChange={(event) => this.setState({start: event.target.value})} type="time" step="900" defaultValue={this.state.start}/>
                                        </InputGroup>
                                    </ControlLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>Background:</InputGroup.Addon>
                                            <FormControl onChange={(event) => this.setState({background: event.target.value})} type="color" defaultValue={this.state.background}/>
                                        </InputGroup>
                                    </ControlLabel>
                                </Col>
                                <Col md={4}>
                                    <ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>End:&nbsp;</InputGroup.Addon>
                                            <FormControl onChange={(event) => this.setState({end: event.target.value})} type="time" step="900" defaultValue={this.state.end}/>
                                        </InputGroup>
                                    </ControlLabel>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.handleNewEvent}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        );
    }
}