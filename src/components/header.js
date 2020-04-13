import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../img/logo.svg';

// Services
import { withFirebase } from './services/Firebase';

import * as ROUTES from '../constants/routes';

const Header = (props) => {
    return (
        <div className="Header">
            <Navbar collapseOnSelect bg="light" expand="md" sticky="top">
                <Navbar.Brand>
                    <img
                        alt="logo"
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                    <p className="app-name d-inline-block">realms</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ROUTES.ROOT}>Home</Nav.Link>
                        <Nav.Link as={Link} to="#1">Page 1</Nav.Link>
                        <Nav.Link as={Link} to="#2">Page 2</Nav.Link>
                        <Nav.Link as={Link} to="#3">Page 3</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#4-1">Item 1</NavDropdown.Item>
                            <NavDropdown.Item href="#4-2">Item 2</NavDropdown.Item>
                            <NavDropdown.Item href="#4-3">Item 3</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => props.firebase.doSignOut()}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default withFirebase(Header);