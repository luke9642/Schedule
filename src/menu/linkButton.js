import React from "react";
import {NavHashLink} from "react-router-hash-link";

const LinkButton = ({to, exact=false, subLinks, children}) => (
    <NavHashLink exact={exact} smooth to={to} activeStyle={{pointerEvents: "none"}}>{children}</NavHashLink>
);

export default LinkButton;