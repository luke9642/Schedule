import React from "react";
import {Col} from "react-bootstrap";
import Note from "./note";
import axios from "axios/index";

export default class Notes extends React.Component {
    state = {
        notes: []
    };

    componentDidMount() {
        axios
            .get('http://localhost:3001/notes')
            .then((response) => {
                this.setState({notes: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    groupNotes = () => {
        let notesList = [[], [], [], []];
        let i = 0;
        this.state.notes.forEach(note => notesList[i++ % 4].push(note));
        i = 0;

        return (
            <div>
                {notesList.map(notesRow => <Col key={i++} xs={12} sm={6} md={3}>{notesRow.map(note => <Note key={i++} note={note}/>)}</Col>)}
            </div>
        );
    };

    // noinspection JSUnusedGlobalSymbols
    render = () => (
        <div>{this.groupNotes()}</div>
    );
}
