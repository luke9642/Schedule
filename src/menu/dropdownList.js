import React, {Component} from "react";
import LinkButton from "./linkButton";

export default class DropdownList extends Component {
    state = {
        dropdownClassName: "dropdown",
        dropdownMenuClassName: "dropdown-menu"
    };

    render() {
        const link = this.props.link;
        return (
            <li
                className={this.state.dropdownClassName + " " +  this.props.className}
                onMouseEnter={() => this.setState({dropdownClassName:  "dropdown open"})}
                onMouseLeave={() => this.setState({dropdownClassName: "dropdown"})}
            >
                <LinkButton to={link.to} exact={link.exact}>{link.name}</LinkButton>
                <ul
                    className={this.state.dropdownMenuClassName}
                    onMouseEnter={() => this.setState({dropdownMenuClassName:  "dropdown-menu open"})}
                    onMouseLeave={() => this.setState({dropdownMenuClassName: "dropdown-menu"})}
                >
                    {link.subLinks.map(subLink => (<li key={subLink.name}><LinkButton to={subLink.to}>{subLink.name}</LinkButton></li>)
                    )}
                </ul>
            </li>
        );
    }
}