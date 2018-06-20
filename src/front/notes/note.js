import React from "react";
import Color from "color";
import {
    Button,
    Col,
    ControlLabel,
    FormControl,
    Glyphicon,
    InputGroup,
    Modal,
    Panel,
    Row
} from "react-bootstrap";
import axios from "axios/index";

export default class Note extends React.Component {
    state = {
        show: false,
        name: this.props.note.name,
        content: this.props.note.content,
        color: this.props.note.color,
        background: this.props.note.background
    };

    removeNote = (event) => {
        event.preventDefault();

        axios({
            method: 'DELETE',
            url: 'http://localhost:3001/note',
            data: {
                note: this.props.note
            },
            withCredentials: true
        }).then((response) => {
            this.setState({show: false});
            if (response.data.status) {
                this.props.history.push("");
                this.props.history.push("/Notes");
            }
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
        });
    };

    updateNote = (event) => {
        event.preventDefault();

        // axios({
        //     method: 'PUT',
        //     url: 'http://localhost:3001/event',
        //     data: {
        //         oldEvent: this.props.event,
        //         newEvent: {
        //             name: this.state.name,
        //             description: this.state.description,
        //             weekday: this.state.weekday,
        //             color: this.state.color,
        //             background: this.state.background,
        //             start: this.state.start,
        //             end: this.state.end
        //         }
        //     },
        //     withCredentials: true
        // }).then((response) => {
        //     this.props.onHide();
        //     if (response.data.status) {
        //         this.props.updateEvents();
        //     }
        // })
        //     .catch((error) => {
        //         alert(error.response.data.message);
        //     });

        axios({
            method: 'PUT',
            url: 'http://localhost:3001/note',
            data: {
                oldNote: this.props.note,
                newNote: {
                    name: this.state.name,
                    content: this.state.content,
                    color: this.state.color,
                    background: this.state.background
                }
            },
            withCredentials: true
        }).then((response) => {
            this.setState({show: false});
            if (response.data.status) {
                this.props.history.push("");
                this.props.history.push("/Notes");
            }
        })
            .catch((error) => {
                console.log("error");
                console.log(error.response.data.message);
            });
    };

    render() {
        const noteBackground = Color(this.props.note.background).whiten(1);
        noteBackground.values.alpha = 0.1;
        return (
            <Row>
                <Panel className="note"
                       style={{backgroundColor: noteBackground.rgbaString(), borderColor: this.props.note.background}}>
                    <Panel.Heading style={{backgroundColor: this.props.note.background, color: this.props.note.color}}>
                        <Panel.Title componentClass="h3">
                            <Row>
                                <Col xs={10} sm={10}>
                                    {this.props.note.name}
                                </Col>
                                <Col xs={2} sm={2}>
                                    <a style={{color: this.props.note.color}} className="edit"
                                       onClick={() => this.setState({show: true})}>
                                        <Glyphicon glyph="pencil"/>
                                    </a>
                                </Col>
                            </Row>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body style={{minHeight: "200px"}}>{this.props.note.content}</Panel.Body>
                </Panel>
                <form>
                    <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title><FormControl onChange={(event) => this.setState({name: event.target.value})} bsSize="lg" type="text"
                                                      defaultValue={this.props.note.name}/></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl onChange={(event) => this.setState({content: event.target.value})} componentClass="textarea" rows={15} defaultValue={this.props.note.content}/>
                        </Modal.Body>
                        <hr/>
                        <Modal.Body>
                            <ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon>Font color:&nbsp;&nbsp;&nbsp;</InputGroup.Addon>
                                    <FormControl onChange={(event) => this.setState({color: event.target.value})} type="color" defaultValue={this.props.note.color}/>
                                </InputGroup>
                            </ControlLabel>
                            <ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon>Background:</InputGroup.Addon>
                                    <FormControl onChange={(event) => this.setState({background: event.target.value})} type="color" defaultValue={this.props.note.background}/>
                                </InputGroup>
                            </ControlLabel>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button type="submit" bsStyle="danger" onClick={this.removeNote}>Remove note</Button>
                            <Button onClick={this.updateNote} bsStyle="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </Row>
        );
    }
}