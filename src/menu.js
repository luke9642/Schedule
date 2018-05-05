import React from "react";
import {ButtonGroup, DropdownButton, MenuItem} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Menu = ({links}) => {
    const LinkButton = ({to, exact=false, children}) => (
        <NavLink className="btn btn-default" exact={exact} to={to} activeClassName="btn-primary">{children}</NavLink>
    );

    const createLinks = links.map(link => (<LinkButton to={link.to} exact={link.exact}>{link.name}</LinkButton>));

    return (
        <ButtonGroup justified>{createLinks}
            {/*<DropdownButton title="Dropdown" id="bg-justified-dropdown">*/}
                {/*<MenuItem eventKey="1">Dropdown link</MenuItem>*/}
                {/*<MenuItem eventKey="2">Dropdown link</MenuItem>*/}
            {/*</DropdownButton>*/}
        </ButtonGroup>
    );
};

export default Menu;