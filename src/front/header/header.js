import React, { Component } from 'react';
import {Grid, PageHeader, Row} from "react-bootstrap";
import {Route} from "react-router-dom";
import "./header.css";

export default class Header extends Component {
    getHeader = () => this.props.links.map(link => {
        return (<Route key={link.name} exact path={link.to} render={() => (
            <Grid fluid className="transit" style={{background: link.color}}>
                <Row>
                    <PageHeader>
                        {this.props.title}
                        <small>{link.name}</small>
                    </PageHeader>
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </Grid>
        )}/>)
    });

    render() {
        return (
            <div>
                {this.getHeader()}
            </div>
        );
    }
}
