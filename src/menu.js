import React from "react";
import {ButtonGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Menu = ({links}) => {
    const LinkButton = ({to, exact=false, children}) => (
        <NavLink className="btn btn-default" exact={exact} to={to} activeStyle={{pointerEvents: "none"}} activeClassName="btn-primary">{children}</NavLink>
    );

    const createLinks = links.map(link => (<LinkButton key={link.name} to={link.to} exact={link.exact}>{link.name}</LinkButton>));

    return (
        <ButtonGroup justified>{createLinks}</ButtonGroup>
    );
};

export default Menu;


//{/*<DropdownButton title="Dropdown" id="bg-justified-dropdown">*/}
//                 {/*<MenuItem eventKey="1">Dropdown link</MenuItem>*/}
//                 {/*<MenuItem eventKey="2">Dropdown link</MenuItem>*/}
//             {/*</DropdownButton>*/}