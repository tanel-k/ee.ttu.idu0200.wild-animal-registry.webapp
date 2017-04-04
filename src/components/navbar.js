import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

class CustomNavbar extends Component {
    render() {
        const { router } = this.props;

        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src='/logo.png' />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <li className={router.isActive('/', true) ? 'active' : ''} role='presentation'><Link to='/'>Animal index</Link></li>
                        <li className={router.isActive('/sightings') ? 'active' : ''} role='presentation'><Link to='/sightings'>Sightings map</Link></li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default CustomNavbar;