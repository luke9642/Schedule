import React from "react";
import {ButtonGroup} from "react-bootstrap";
import {NavHashLink} from "react-router-hash-link";

const Menu = ({links}) => {
    const LinkButton = ({to, exact=false, subLinks, children}) => (
        <NavHashLink className="btn btn-default" exact={exact} smooth to={to} activeStyle={{pointerEvents: "none"}} activeClassName="btn-primary">{children}</NavHashLink>
    );

    const createLinks = links.map(link => {
        let children;
        // TODO
        // if (link.subLinks === undefined) {
        //     children = link.name;
        // } else {
        //     children = link.subLinks.map(subLink => )
        // }

        return <LinkButton key={link.name} to={link.to} exact={link.exact}>{link.name}</LinkButton>;
    });

    return (
        <ButtonGroup justified>{createLinks}</ButtonGroup>
    );
};

export default Menu;


//{/*<DropdownButton title="Dropdown" id="bg-justified-dropdown">*/}
//                 {/*<MenuItem eventKey="1">Dropdown link</MenuItem>*/}
//                 {/*<MenuItem eventKey="2">Dropdown link</MenuItem>*/}
//             {/*</DropdownButton>*/}