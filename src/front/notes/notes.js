import React from "react";
import {Button, Col, ControlLabel, FormControl, Glyphicon, InputGroup, Modal} from "react-bootstrap";
import Note from "./note";
import axios from "axios/index";
import "./notes.css";
import InfiniteScroll from 'react-infinite-scroller';

export default class Notes extends React.Component {
    state = {
        notes: [],
        show: false,
        name: "",
        content: "",
        color: "#000000",
        background: "#00A591",
        hasMore: true
    };

    updateNotes = (page) => {
        axios
            .get('http://localhost:3001/notes/' + page, {withCredentials: true})
            .then((response) => {
                this.setState({notes: this.state.notes.concat(response.data.notes), hasMore: page < response.data.maxPage});
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push("/login");
            });
    };

    groupNotes = () => {
        let notesList = [[], [], [], []];
        let i = 0;
        this.state.notes.forEach(note => notesList[i++ % 4].push(note));

        return (
                <InfiniteScroll
                    pageStart={-1}
                    loadMore={this.updateNotes}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {notesList.map((notesRow, j) =>
                        (<Col key={j} xs={12} sm={6} md={3}>
                            {notesRow.map((note, k) => <Note key={k} note={note} {...this.props}/>)}
                        </Col>)
                    )}
                </InfiniteScroll>
        );
    };

    handleNewNote = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:3001/note',
            data: {
                note: {
                    name: this.state.name,
                    content: this.state.content,
                    background: this.state.background,
                    color: this.state.color
                }
            },
            withCredentials: true,
        }).then((response) => {
            this.setState({show: false});
            if (response.data.status) {
                this.props.history.push("");
                this.props.history.push("/Notes");
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
    };

    render = () => [
        <div key="notes">{this.groupNotes()}</div>,
        <Button bsStyle="primary" id="add-note" key="add" onClick={() => this.setState({show: true})}>
            <Glyphicon glyph="plus"/>
        </Button>,
        <form key="modal">
            <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title><FormControl onChange={(event) => this.setState({name: event.target.value})} bsSize="lg" type="text" placeholder="Title"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl onChange={(event) => this.setState({content: event.target.value})} componentClass="textarea" placeholder="Content"/>
                </Modal.Body>
                <hr/>
                <Modal.Body>
                    <ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>Font color:&nbsp;&nbsp;&nbsp;</InputGroup.Addon>
                            <FormControl onChange={(event) => this.setState({color: event.target.value})} type="color" defaultValue={this.state.color}/>
                        </InputGroup>
                    </ControlLabel>
                    <ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>Background:</InputGroup.Addon>
                            <FormControl onChange={(event) => this.setState({background: event.target.value})} type="color" defaultValue={this.state.background}/>
                        </InputGroup>
                    </ControlLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleNewNote} bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </form>
    ];
}
