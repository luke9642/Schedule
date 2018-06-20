import React, {Component} from "react";
import axios from "axios/index";
import {Glyphicon, Image, Label, Media} from "react-bootstrap";

export default class Profile extends Component {
    state = {
        login: "",
        name: "",
        surname: "",
        notesNumber: 0,
        eventsNumber: 0
    };

    componentDidMount() {
        axios
            .get('http://localhost:3001/profile', {withCredentials: true})
            .then((response) => {
                const data = response.data;

                this.setState({
                    login: data.login,
                    name: data.name,
                    surname: data.surname,
                    notesNumber: data.notesNumber,
                    eventsNumber: data.eventsNumber,
                    loggedIn: true
                });
            })
            .catch(() => {
                this.props.history.push("/login");
            });
    }

    render() {
        return (
            <div>
                <Media>
                    <Media.Body>
                        <Media.Heading componentClass="div"><h1>Hello {this.state.name} {this.state.surname} <Glyphicon glyph="user" /></h1></Media.Heading>

                        <h4>Your login: <Label bsStyle="primary">{this.state.login}</Label></h4>
                        <h4>You have <Label bsStyle="default">{this.state.notesNumber}</Label> notes and <Label bsStyle="default">{this.state.eventsNumber}</Label> events</h4>
                        <br />
                        <p className="align-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                        </p>
                        <p className="align-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                        </p>
                    </Media.Body>
                    <Media.Right align="middle">
                        <Image width={500} src="/main.jpg" rounded />
                    </Media.Right>
                </Media>


            </div>
        );
    }
};