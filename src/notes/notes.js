import React from "react";
import {Col, Row} from "react-bootstrap";

export default class Notes extends React.Component {
    constructor() {
        super();

        this.state = {
            notes: [
                {
                    name: "name1",
                    content: "Lorem ipsum",
                    background: "#fff",
                    color: "#000"
                },
                {
                    name: "name1",
                    content: "Lorem ipsum",
                    background: "#fff",
                    color: "#000"
                },
                {
                    name: "name1",
                    content: "Lorem ipsum",
                    background: "#fff",
                    color: "#000"
                }
            ]
        };
    }

    groupNotes = () => {
        const numOfRowsInCol = Math.ceil(this.state.notes.length / 4);
        let i = 0;

        for (let note in this.state.notes) {

        }

        // map(note => (<Row><h3>{note.name}</h3><p>{note.content}</p></Row>));
    };

    // noinspection JSUnusedGlobalSymbols
    render = () => (
        <div>
            <Col xs={12} sm={6} md={3}>
                <Row>11</Row>
                <Row>12</Row>
                <Row>13</Row>
                <Row>14</Row>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Row>21</Row>
                <Row>22</Row>
                <Row>23</Row>
                <Row>24</Row>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Row>31</Row>
                <Row>32</Row>
                <Row>33</Row>
                <Row>34</Row>
            </Col>
            <Col xs={12} sm={6} md={3}>
                <Row>41</Row>
                <Row>42</Row>
                <Row>43</Row>
                <Row>44</Row>
            </Col>
        </div>
    );
}
