import React from "react";
import {Panel, Row} from "react-bootstrap";
import "./note.css";

export default class Note extends React.Component {
    render = () => (
        <Row>
            <Panel className="note" style={{borderColor: this.props.note.background}}>
                <Panel.Heading style={{background: this.props.note.background, color: this.props.note.color}}>
                    <Panel.Title componentClass="h3">{this.props.note.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>{this.props.note.content}</Panel.Body>
            </Panel>
        </Row>
    );
}