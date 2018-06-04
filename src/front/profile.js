import React, {Component} from "react";
import axios from "axios/index";

export default class Profile extends Component {
    state = {
        name: "",
        surname: "",
        notesNumber: 0,
        eventsNumber: 0
    };

    componentDidMount() {
        axios
            .get('http://localhost:3001/profile')
            .then((response) => {
                const data = response.data;
                this.setState({
                    name: data.name,
                    surname: data.surname,
                    notesNumber: data.notesNumber,
                    eventsNumber: data.eventsNumber
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>Hello {this.state.name} {this.state.surname}</h2>
                <p>You have {this.state.notesNumber} notes and {this.state.eventsNumber} evens</p>
            </div>
        );
    }
};